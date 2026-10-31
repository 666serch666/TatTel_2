package com.tattel.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.tattel.app.model.LessonResult
import com.tattel.app.ui.theme.*

@Composable
fun CompletionScreen(
    result: LessonResult,
    onRetry: () -> Unit,
    onGoHome: () -> Unit
) {
    val accuracy = if (result.totalCount > 0) {
        (result.correctCount.toFloat() / result.totalCount * 100).toInt()
    } else 0

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(TatTelBackground)
            .statusBarsPadding()
            .navigationBarsPadding()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Spacer(modifier = Modifier.height(16.dp))

        // Центральный блок с иконкой и поздравлением
        Column(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Box(
                modifier = Modifier
                    .size(90.dp)
                    .clip(RoundedCornerShape(45.dp))
                    .background(TatTelLightGreen),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.CheckCircle,
                    contentDescription = null,
                    tint = TatTelGreenPrimary,
                    modifier = Modifier.size(54.dp)
                )
            }

            Spacer(modifier = Modifier.height(20.dp))

            Text(
                text = "Урок завершён!",
                fontSize = 26.sp,
                fontWeight = FontWeight.Bold,
                color = TatTelDarkText
            )

            Spacer(modifier = Modifier.height(6.dp))

            Text(
                text = "Булдырдың! Вы освоили первый урок «Приветствия».",
                fontSize = 15.sp,
                color = TatTelMutedText,
                lineHeight = 20.sp
            )

            Spacer(modifier = Modifier.height(32.dp))

            // Карточки статистики: Правильные ответы и Ошибки
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                // Карточка верных ответов
                Card(
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(18.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
                ) {
                    Column(
                        modifier = Modifier.padding(18.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = "${result.correctCount}",
                            fontSize = 32.sp,
                            fontWeight = FontWeight.Bold,
                            color = TatTelGreenPrimary
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "Верных ответов",
                            fontSize = 13.sp,
                            color = TatTelMutedText
                        )
                    }
                }

                // Карточка ошибок
                Card(
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(18.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
                ) {
                    Column(
                        modifier = Modifier.padding(18.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = "${result.wrongCount}",
                            fontSize = 32.sp,
                            fontWeight = FontWeight.Bold,
                            color = if (result.wrongCount > 0) Color(0xFFBA1A1A) else TatTelDarkText
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "Ошибок",
                            fontSize = 13.sp,
                            color = TatTelMutedText
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Дополнительная карточка точности
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = TatTelLightGreen),
                elevation = CardDefaults.cardElevation(0.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 20.dp, vertical = 14.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Точность прохождения",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Medium,
                        color = TatTelGreenPrimary
                    )
                    Text(
                        text = "$accuracy%",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        color = TatTelGreenPrimary
                    )
                }
            }
        }

        // Кнопки действий: Повторить и На главную
        Column(
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Button(
                onClick = onRetry,
                colors = ButtonDefaults.buttonColors(
                    containerColor = TatTelGreenPrimary,
                    contentColor = Color.White
                ),
                shape = RoundedCornerShape(14.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Refresh,
                    contentDescription = null,
                    modifier = Modifier.size(18.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "Пройти ещё раз",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Medium
                )
            }

            OutlinedButton(
                onClick = onGoHome,
                shape = RoundedCornerShape(14.dp),
                colors = ButtonDefaults.outlinedButtonColors(
                    containerColor = Color.White,
                    contentColor = TatTelDarkText
                ),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Home,
                    contentDescription = null,
                    modifier = Modifier.size(18.dp),
                    tint = TatTelDarkText
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "На главный экран",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Medium
                )
            }
        }
    }
}
