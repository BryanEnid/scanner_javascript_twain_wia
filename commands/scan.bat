@echo off

REM https://www.naps2.com/doc-command-line.html
REM --progress: Show progress bar / --force: Replace existing file
REM Run scanner and then -o :Output file (output.jpg) in "/Output" folder 
START /W /B ../App/NAPS2.Console.exe -o ../Output/output.jpg --progress --force
REM Covert the actual file to pdf
START /W /B ../App/NAPS2.Console.exe -i ../Output/output.jpg -n 0 -o ../Output/output.pdf --force

EXIT