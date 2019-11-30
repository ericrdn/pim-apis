sleep 20s

for d in `ls scripts/*.sql | sort -V` ; do (/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Password@123 -i $d); done