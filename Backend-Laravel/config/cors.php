<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'aspirasi'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:3000', // <-- 2. KITA TULIS LANGSUNG, LEBIH AMAN UNTUK DEV
    ], // Ganti ini sesuai FE lo

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];