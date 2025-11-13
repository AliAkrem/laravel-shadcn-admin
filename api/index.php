<?php
/**
 * Here is the serverless function entry
 * for deployment with Vercel.
 */

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Set the correct document root
$_SERVER['DOCUMENT_ROOT'] = __DIR__ . '/../public';

require __DIR__.'/../public/index.php';