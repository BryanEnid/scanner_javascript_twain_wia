Set oWS = WScript.CreateObject("WScript.Shell")
scriptdir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
userProfilePath = oWS.ExpandEnvironmentStrings("%UserProfile%")
sLinkFile = userProfilePath + "\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\ScannerEnid.lnk"
Set oLink = oWS.CreateShortcut(sLinkFile)


oLink.TargetPath = "C:\Program Files (x86)\ScannerEnid\config.vbs"
' optional shortcut properties
' oLink.Arguments = ""
' oLink.Description = "MyProgram"
' oLink.HotKey = "ALT+CTRL+F"
oLink.IconLocation = scriptdir + "\Setup\Data\Server.ico"
' oLink.WindowStyle = "1"
oLink.WorkingDirectory = scriptdir
oLink.Save