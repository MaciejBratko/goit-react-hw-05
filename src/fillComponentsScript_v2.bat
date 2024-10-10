@echo off
setlocal enabledelayedexpansion

echo Starting to process empty directories...

:: Function to create template files (called as a label)
:createFiles
set "dir=%~1"
set "basename=%~nx1"

echo // React component for !basename! > "!dir!\!basename!.jsx"
echo /* Styles for !basename! component */ > "!dir!\!basename!.module.css"
echo Created template files in: !dir!
goto :eof

:: Main script
for /r %%G in (.) do (
    set "isEmpty=true"
    set "currentDir=%%G"
    
    :: Check if directory has any files
    for /f "tokens=*" %%F in ('dir /a-d /b "!currentDir!" 2^>nul') do (
        set "isEmpty=false"
    )
    
    :: Check if directory has any subdirectories (excluding . and ..)
    for /f "tokens=*" %%F in ('dir /ad /b "!currentDir!" 2^>nul') do (
        set "isEmpty=false"
    )
    
    :: If directory is empty, create the files
    if "!isEmpty!"=="true" (
        if not "!currentDir!"=="." (
            echo Processing empty directory: !currentDir!
            call :createFiles "!currentDir!"
        )
    )
)

echo Finished processing directories.
endlocal