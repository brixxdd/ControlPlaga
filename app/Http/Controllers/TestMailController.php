<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\TestEmail;
use Inertia\Inertia;

class TestMailController extends Controller
{
    public function index()
    {
        return Inertia::render('TestMail/Index');
    }
    
    public function send(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);
        
        Mail::to($request->email)->send(new TestEmail());
        
        return redirect()->back()->with('success', 'Correo enviado a Mailtrap correctamente!');
    }
} 