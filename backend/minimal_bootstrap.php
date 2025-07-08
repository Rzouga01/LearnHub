<?php

// Minimal Laravel bootstrap to isolate configuration issues
require_once 'vendor/autoload.php';

// Load environment variables manually
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Test basic configuration loading
try {
    echo "Testing basic configuration loading...\n";
    
    // Check if we can access environment variables
    echo "APP_NAME: " . $_ENV['APP_NAME'] . "\n";
    echo "APP_ENV: " . $_ENV['APP_ENV'] . "\n";
    
    // Test if we can load config files manually
    $appConfig = require 'config/app.php';
    echo "App config loaded successfully\n";
    
    // Test specific configuration sections
    if (isset($appConfig['providers']) && is_array($appConfig['providers'])) {
        echo "Providers array exists and is valid\n";
    } else {
        echo "ERROR: Providers array is missing or invalid\n";
    }
    
    if (isset($appConfig['aliases']) && is_array($appConfig['aliases'])) {
        echo "Aliases array exists and is valid\n";
    } else {
        echo "ERROR: Aliases array is missing or invalid\n";
    }
    
    echo "Basic configuration test completed successfully\n";
    
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
}
