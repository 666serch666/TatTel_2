package com.tattel.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val TatTelColorScheme = lightColorScheme(
    primary = TatTelGreenPrimary,
    onPrimary = Color.White,
    primaryContainer = TatTelLightGreen,
    onPrimaryContainer = TatTelGreenPrimary,
    background = TatTelBackground,
    onBackground = TatTelDarkText,
    surface = TatTelSurface,
    onSurface = TatTelDarkText,
    surfaceVariant = TatTelSurfaceVariant,
    onSurfaceVariant = TatTelDarkText,
    outline = TatTelBorder,
    error = TatTelError,
    errorContainer = TatTelErrorContainer,
    onError = Color.White,
    onErrorContainer = TatTelError
)

@Composable
fun TatTelTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = TatTelColorScheme,
        typography = Typography,
        content = content
    )
}
