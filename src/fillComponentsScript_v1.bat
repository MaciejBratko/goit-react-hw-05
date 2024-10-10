@echo off
setlocal enabledelayedexpansion

echo Starting to process empty folders...

:: Find all directories recursively
for /f "delims=" %%D in ('dir /s /b /ad') do (
    set "is_empty=1"
    
    :: Check if directory contains any files
    for /f %%F in ('dir /b "%%D\*.*" 2^>nul') do (
        set "is_empty=0"
    )
    
    :: Check if directory contains any subdirectories
    for /f %%S in ('dir /b /ad "%%D\*.*" 2^>nul') do (
        set "is_empty=0"
    )
    
    :: If directory is empty, create the files
    if !is_empty!==1 (
        :: Get the folder name without the path
        for %%I in ("%%D") do set "folder_name=%%~nxI"
        
        echo Creating files in empty folder: %%D
        
        :: Create .jsx file
        echo // React component for !folder_name! > "%%D\!folder_name!.jsx"
        
        :: Create .module.css file
        echo /* Styles for !folder_name! */ > "%%D\!folder_name!.module.css"
        
        echo Created !folder_name!.jsx and !folder_name!.module.css
    )
)

echo Process completed.
pause