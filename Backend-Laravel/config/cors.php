<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'aspirasi'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'https://hmrpl.up.railway.app',
        'https://web-hmrpl-production.up.railway.app',
    ],


    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
