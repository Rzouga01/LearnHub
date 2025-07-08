<?php

// Alternative script to perform common Laravel operations without using artisan
require_once 'vendor/autoload.php';

// Load environment
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

echo "Laravel Alternative Helper\n";
echo "=======================\n";
echo "This script provides basic Laravel functionality without using artisan.\n\n";

// Show available commands
echo "Available commands:\n";
echo "1. Show Laravel version\n";
echo "2. List routes\n";
echo "3. Generate new application key\n";
echo "4. Clear caches manually\n";
echo "5. Show environment info\n";

if ($argc > 1) {
    $command = $argv[1];
    
    switch ($command) {
        case 'version':
            echo "Laravel Framework: " . app()->version() . "\n";
            break;
            
        case 'key:generate':
            $key = 'base64:' . base64_encode(random_bytes(32));
            echo "Generated application key: $key\n";
            echo "Please update your .env file with: APP_KEY=$key\n";
            break;
            
        case 'cache:clear':
            // Manual cache clearing
            $cacheDir = storage_path('framework/cache');
            if (is_dir($cacheDir)) {
                $files = glob($cacheDir . '/*');
                foreach ($files as $file) {
                    if (is_file($file)) {
                        unlink($file);
                    }
                }
                echo "Cache cleared manually.\n";
            }
            break;
            
        case 'env':
            echo "Environment: " . $_ENV['APP_ENV'] . "\n";
            echo "Debug mode: " . ($_ENV['APP_DEBUG'] === 'true' ? 'enabled' : 'disabled') . "\n";
            echo "Database: " . $_ENV['DB_CONNECTION'] . "\n";
            break;
            
        default:
            echo "Unknown command: $command\n";
    }
} else {
    echo "\nUsage: php laravel_helper.php [command]\n";
    echo "Example: php laravel_helper.php version\n";
}
