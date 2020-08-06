@echo off

START /W /B ../App/NAPS2.Console.exe -o ../Output/output.jpg --progress --force

START /W /B ../App/NAPS2.Console.exe -i ../Output/output.jpg -n 0 -o ../Output/output.pdf --force

EXIT