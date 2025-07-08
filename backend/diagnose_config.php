<?php

// Diagnostic script to identify the specific configuration causing the array_merge error
$envFile = '.env';
$envContent = file_get_contents($envFile);

echo "Checking .env file for potential type conflicts:\n";
echo "=========================================\n";

$lines = explode("\n", $envContent);
foreach ($lines as $lineNumber => $line) {
    $line = trim($line);
    if (empty($line) || strpos($line, '#') === 0) {
        continue;
    }
    
    if (strpos($line, '=') !== false) {
        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        
        // Check for numeric values that might be causing type issues
        if (is_numeric($value) && !in_array($key, ['DB_PORT', 'SESSION_LIFETIME', 'BCRYPT_ROUNDS', 'PHP_CLI_SERVER_WORKERS'])) {
            echo "Line " . ($lineNumber + 1) . ": $key=$value (numeric value)\n";
        }
        
        // Check for values that might be arrays but are set as integers
        if (in_array($key, ['LOG_STACK', 'CACHE_PREFIX']) && is_numeric($value)) {
            echo "Line " . ($lineNumber + 1) . ": $key=$value (POTENTIAL ISSUE - should be array/string)\n";
        }
    }
}

echo "\nDone checking .env file.\n";
?>
