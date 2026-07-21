$tcp = New-Object System.Net.Sockets.TcpClient
$portActive = $false
try {
    $connect = $tcp.BeginConnect("127.0.0.1", 5173, $null, $null)
    $wait = $connect.AsyncWaitHandle.WaitOne(300, $false)
    if ($connect.IsCompleted) {
        $tcp.EndConnect($connect)
        $portActive = $true
    }
} catch {}
$tcp.Close()

if (-not $portActive) {
    # Launch Vite dev server via hidden batch script process
    Start-Process -FilePath "C:\Users\Lenovo\.gemini\antigravity\scratch\nir-brothers-coffee\run_server.bat" -WindowStyle Hidden
    Start-Sleep -Seconds 5
}

# Open the site in the default browser
Start-Process "http://localhost:5173"
