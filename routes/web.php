<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Auth routes
Route::prefix('/')->group(function () {
    Route::get('/sign-in', function () {
        return Inertia::render('auth/sign-in');
    })->name('auth.sign-in');

    Route::get('/sign-in-2', function () {
        return Inertia::render('auth/sign-in-2');
    })->name('auth.sign-in');

    Route::get('/sign-up', function () {
        return Inertia::render('auth/sign-up');
    })->name('auth.sign-up');

    Route::get('/forgot-password', function () {
        return Inertia::render('auth/forgot-password');
    })->name('auth.forgot-password');

    Route::get('/otp', function () {
        return Inertia::render('auth/otp');
    })->name('auth.otp');
});

// Authenticated routes
// Dashboard
Route::get('/', function () {
    return Inertia::render('authenticated/dashboard');
})->name('dashboard');

// Users
Route::get('/users', function () {
    return Inertia::render('authenticated/users');
})->name('users.index');

// Tasks
Route::get('/tasks', function () {
    return Inertia::render('authenticated/tasks');
})->name('tasks.index');

// Apps
Route::get('/apps', function () {
    return Inertia::render('authenticated/apps');
})->name('apps.index');

// Chats
Route::get('/chats', function () {
    return Inertia::render('authenticated/chats');
})->name('chats.index');

Route::get('/help-center', function () {
    return Inertia::render('authenticated/help-center');
})->name('help-center');

// Settings
Route::prefix('settings')->name('settings.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('authenticated/settings');
    })->name('index');

    Route::get('/profile', function () {
        return Inertia::render('authenticated/settings/profile');
    })->name('profile');

    Route::get('/account', function () {
        return Inertia::render('authenticated/settings/account');
    })->name('account');

    Route::get('/appearance', function () {
        return Inertia::render('authenticated/settings/appearance');
    })->name('appearance');

    Route::get('/notifications', function () {
        return Inertia::render('authenticated/settings/notifications');
    })->name('notifications');

    Route::get('/display', function () {
        return Inertia::render('authenticated/settings/display');
    })->name('display');
    Route::get('/help-center', function () {
        return Inertia::render('authenticated/settings/display');
    })->name('display');
});

// Error pages
Route::prefix('errors')->name('error.')->group(function () {
    Route::get('forbidden', function () {
        return Inertia::render('errors/forbidden');
    })->name('forbidden');

    Route::get('unauthorized', function () {
        return Inertia::render('errors/unauthorized');
    })->name('unauthorized');

    Route::get('maintenance-error', function () {
        return Inertia::render('errors/maintenance');
    })->name('maintenance');

    Route::get('internal-server-error', function () {
        return Inertia::render('errors/internal-server');
    })->name('maintenance');

    // Fallback for 404
    Route::fallback(function () {
        return Inertia::render('not-found');
    });
});
