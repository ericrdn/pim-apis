echo "Excluindo Pastas..."

for d in ./*/ ; do (cd "$d" && rm -rf publish); done

echo "Criando pastas..."

for d in ./*/ ; do (cd "$d" && mkdir publish); done

echo "Compilando..."

for d in ./*/ ; do (cd "$d" && dotnet publish -o publish -r ubuntu-x64); done

echo "Criando imagens..."

for d in ./*/ ; do (cd "$d" && docker build -t ${PWD##*/} . ); done
