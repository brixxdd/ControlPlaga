<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\TestEmail;

class MailController extends Controller
{
    public function enviarCorreoPrueba()
    {
        Mail::to('destinatario@ejemplo.com')->send(new TestEmail());
        return "Correo enviado a Mailtrap correctamente!
        hola alo";
    }
} 