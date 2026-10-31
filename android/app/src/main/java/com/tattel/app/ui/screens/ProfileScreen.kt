package com.tattel.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Book
import androidx.compose.material.icons.filled.Person
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
import com.tattel.app.ui.theme.*

@Composable
fun ProfileScreen(
    isLessonCompleted: Boolean,
    onResetProgress: () -> Unit
) {
    val completedLessons = if (isLessonCompleted) 1 else 0
    val progressPercent = if (isLessonCompleted) 20 else 0 // 1 из 5 уроков первого блока = 20%
    val wordsLearned = if (isLessonCompleted) 5 else 0

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = PaddingValues(top = 24.dp, bottom = 32.dp)
    ) {
        // Шапка профиля
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(20.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(60.dp)
                            .clip(RoundedCornerShape(30.dp))
                            .background(TatTelLightGreen),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Person,
                            contentDescription = null,
                            tint = TatTelGreenPrimary,
                            modifier = Modifier.size(32.dp)
                        )
                    }

                    Spacer(modifier = Modifier.width(16.dp))

                    Column {
                        Text(
                            text = "Ученик TatTel",
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold,
                            color = TatTelDarkText
                        )
                        Spacer(modifier = Modifier.height(2.dp))
                        Text(
                            text = "Локальный профиль (без регистрации)",
                            fontSize = 13.sp,
                            color = TatTelMutedText
                        )
                    }
                }
            }
        }

        // Общий прогресс
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(20.dp)
                ) {
                    Text(
                        text = "Общий прогресс",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = TatTelDarkText
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Курс для начинающих",
                            fontSize = 13.sp,
                            color = TatTelMutedText
                        )
                        Text(
                            text = "$progressPercent%",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            color = TatTelGreenPrimary
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    LinearProgressIndicator(
                        progress = { progressPercent / 100f },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(8.dp)
                            .clip(RoundedCornerShape(4.dp)),
                        color = TatTelGreenPrimary,
                        trackColor = TatTelLightGreen,
                    )
                }
            }
        }

        // Статистика в две колонки
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                Card(
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(18.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
                ) {
                    Column(modifier = Modifier.padding(18.dp)) {
                        Text(
                            text = "$completedLessons",
                            fontSize = 28.sp,
                            fontWeight = FontWeight.Bold,
                            color = TatTelGreenPrimary
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "Пройдено уроков",
                            fontSize = 13.sp,
                            color = TatTelMutedText
                        )
                    }
                }

                Card(
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(18.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
                ) {
                    Column(modifier = Modifier.padding(18.dp)) {
                        Text(
                            text = "$wordsLearned",
                            fontSize = 28.sp,
                            fontWeight = FontWeight.Bold,
                            color = TatTelDarkText
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "Изучено слов",
                            fontSize = 13.sp,
                            color = TatTelMutedText
                        )
                    }
                }
            }
        }

        // Выученные слова
        item {
            Text(
                text = "Словарь первого урока",
                fontSize = 17.sp,
                fontWeight = FontWeight.Bold,
                color = TatTelDarkText
            )
        }

        item {
            val words = listOf(
                "Исәнме" to "Привет",
                "Рәхмәт" to "Спасибо",
                "Әйе" to "Да",
                "Юк" to "Нет",
                "Сау бул" to "До свидания"
            )

            Card(
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 18.dp, vertical = 12.dp)
                ) {
                    words.forEachIndexed { index, (tatar, rus) ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 10.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = tatar,
                                fontSize = 15.sp,
                                fontWeight = FontWeight.SemiBold,
                                color = TatTelGreenPrimary
                            )
                            Text(
                                text = rus,
                                fontSize = 14.sp,
                                color = TatTelDarkText
                            )
                        }
                        if (index < words.size - 1) {
                            HorizontalDivider(color = Color(0xFFF1EFEA))
                        }
                    }
                }
            }
        }

        // Сбросить прогресс для повторного тестирования
        item {
            OutlinedButton(
                onClick = onResetProgress,
                shape = RoundedCornerShape(14.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Icon(
                    imageVector = Icons.Default.Refresh,
                    contentDescription = null,
                    modifier = Modifier.size(16.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "Сбросить прогресс для проверки",
                    fontSize = 14.sp
                )
            }
        }
    }
}
