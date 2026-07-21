Set shell = CreateObject("WScript.Shell")
' Run the batch file to start the server in a hidden window
shell.Run """C:\Users\Lenovo\.gemini\antigravity\scratch\nir-brothers-coffee\run_server.bat""", 0, false
' Wait for 3 seconds
WScript.Sleep 3000
' Open the default browser to the site
shell.Run "http://localhost:5173"
