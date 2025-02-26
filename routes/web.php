<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/projects', function () {
        return Inertia::render('Projects/Index');
    })->name('projects');

    Route::get('/tasks', function () {
        return Inertia::render('Tasks/Index');
    })->name('tasks');

    Route::get('/reports', function () {
        return Inertia::render('Reports/Index');
    })->name('reports');

    Route::get('/settings', function () {
        return Inertia::render('Settings/Index');
    })->name('settings');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/test-email', [App\Http\Controllers\MailController::class, 'enviarCorreoPrueba']);

Route::middleware(['auth'])->group(function () {
    Route::get('/test-mail', [App\Http\Controllers\TestMailController::class, 'index'])->name('test.mail');
    Route::post('/test-mail', [App\Http\Controllers\TestMailController::class, 'send'])->name('test.mail.send');
});

require __DIR__.'/auth.php';
