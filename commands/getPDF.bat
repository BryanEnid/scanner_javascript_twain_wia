@echo off

START /W /B ./App/NAPS2.Console.exe -i ./Output/$(n).pdf -n 0 -o ./Output/$(n).pdf --force

EXIT