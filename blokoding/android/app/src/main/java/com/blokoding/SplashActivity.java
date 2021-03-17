package com.blokoding; // Change this to your package name.

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, MainActivity.class);
        try
        {
            Thread.sleep(2000);
        }
        catch (Exception ex)
        {

        }
        
        startActivity(intent);
        finish();
    }
}