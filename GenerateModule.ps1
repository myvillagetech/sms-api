$camelCase = $args[0] -replace '-(\p{L})', { $_.Groups[1].Value.ToUpper() }
$pascalCase = $args[0] -Replace '[^0-9A-Z]', ' '
(Get-Culture).TextInfo.ToTitleCase($pascalCase) -Replace ' '


function ToPascalCase($str){
    
    $bits = @()
    foreach($token in $str.Split('-')) {
        $newBit = $token[0].ToString().ToUpper(), $token.TrimStart($token[0]) -join ''
        $bits +=$newBIt
    }
    $bits -join ''

}

function ToCamelCase($str){
    $bits = @()
    foreach($token in $str.Split('-')) {
        $newBit = $token[0].ToString().ToUpper(), $token.TrimStart($token[0]) -join ''
        $bits +=$newBIt
    }
    $bits[0] = $bits[0].ToLower()
    $bits -join ''
}

$snakeCaseName = $args[0]
$camelCaseName = ToCamelCase($args[0])
$pascalCaseName = ToPascalCase($args[0])

$newvars = @{
'\$name' = $args[0]
'\$camelCaseName' = ToCamelCase($args[0])
'\$pascalCaseName' = ToPascalCase($args[0])
}



$template = "$PSScriptRoot\.baap\service.txt"
New-Item "$PSScriptRoot\services\$camelCaseName.service.js" -type file

foreach($line in Get-Content $template) {
    foreach($key in $newvars.Keys) {
        if ($line -match $key) {
            $line = $line -replace $key, $newvars[$key]
        }
    }
    Add-Content "$PSScriptRoot\services\$camelCaseName.service.js" $line
}


$template = "$PSScriptRoot\.baap\schema.txt"

New-Item "$PSScriptRoot\schema\$camelCaseName.schema.js" -type file 
foreach($line in Get-Content $template) {
    foreach($key in $newvars.Keys) {
        if ($line -match $key) {
            $line = $line -replace $key, $newvars[$key]
        }
    }
    Add-Content "$PSScriptRoot\schema\$camelCaseName.schema.js" $line
}



$template = "$PSScriptRoot\.baap\routes.txt"
New-Item "$PSScriptRoot\routes\$camelCaseName.routes.js" -type file

foreach($line in Get-Content $template) {
    foreach($key in $newvars.Keys) {
        if ($line -match $key) {
            $line = $line -replace $key, $newvars[$key]
        }
    }
    Add-Content "$PSScriptRoot\routes\$camelCaseName.routes.js" $line
}


$template = "$PSScriptRoot\.baap\dto.txt"
New-Item "$PSScriptRoot\dto\$camelCaseName.dto.js" -type file
foreach($line in Get-Content $template) {
    foreach($key in $newvars.Keys) {
        if ($line -match $key) {
            $line = $line -replace $key, $newvars[$key]
        }
    }
    Add-Content "$PSScriptRoot\dto\$camelCaseName.dto.js" $line
}

