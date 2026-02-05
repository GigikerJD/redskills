# This Powershell script sets up environment variables and runs the Spring Boot backend application.
# It should be executed from the 'backend' directory.

# Load environment variables from .env file
if (Test-Path ".\.env") {
    Write-Host "Loading environment variables from .env..." -ForegroundColor Green
    Get-Content .\.env | ForEach-Object {
        if ($_ -match '^\s*([^=]+)=(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
    Write-Host "Environment variables loaded successfully!" -ForegroundColor Green
} else {
    Write-Host "Warning: .env file not found!" -ForegroundColor Yellow
}

# Display loaded variables
Write-Host "`nLoaded configuration:" -ForegroundColor Cyan
if ($env:JWT_SECRET_KEY) {
    Write-Host "JWT_SECRET_KEY: $($env:JWT_SECRET_KEY.Substring(0, [Math]::Min(20, $env:JWT_SECRET_KEY.Length)))..." -ForegroundColor Gray
}
Write-Host "BACKEND_MONGODB_URI: $($env:BACKEND_MONGODB_URI)" -ForegroundColor Gray
Write-Host "FRONTEND_URL: $($env:FRONTEND_URL)" -ForegroundColor Gray
Write-Host "JWT_EXPIRATION: $($env:JWT_EXPIRATION)" -ForegroundColor Gray
if ($env:OPENAI_API_KEY) {
    Write-Host "OPENAI_API_KEY: $($env:OPENAI_API_KEY.Substring(0, [Math]::Min(20, $env:OPENAI_API_KEY.Length)))..." -ForegroundColor Gray
}

# Run the Spring Boot application
Write-Host "`nStarting Spring Boot application..." -ForegroundColor Green
./mvnw spring-boot:run
