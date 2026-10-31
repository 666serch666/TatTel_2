package com.tattel.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowForward
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.tattel.app.data.LessonRepository
import com.tattel.app.ui.theme.TatTelDarkText
import com.tattel.app.ui.theme.TatTelGreenPrimary
import com.tattel.app.ui.theme.TatTelLightGreen
import com.tattel.app.ui.theme.TatTelMutedText

@Composable
fun HomeScreen(
    isLessonCompleted: Boolean,
    onStartLesson: () -> Unit,
    onNavigateToLessons: () -> Unit
) {
    val progress = if (isLessonCompleted) 1f else 0.2f
    val progressPercent = if (isLessonCompleted) 100 else 20

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = PaddingValues(vertical = 24.dp)
    ) {
        // Заголовок и приветствие
        item {
            Column {
                Text(
                    text = "TatTel",
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Bold,
                    color = TatTelGreenPrimary
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "Хәерле көн! Добро пожаловать",
                    fontSize = 16.sp,
                    color = TatTelMutedText
                )
            }
        }

        // Карточка текущего уровня и прогресса
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
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Уровень 1 · Начинающий",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = TatTelGreenPrimary
                        )
                        Text(
                            text = "$progressPercent%",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            color = TatTelDarkText
                        )
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    LinearProgressIndicator(
                        progress = { progress },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(8.dp)
                            .clip(RoundedCornerShape(4.dp)),
                        color = TatTelGreenPrimary,
                        trackColor = TatTelLightGreen,
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    Text(
                        text = if (isLessonCompleted)
                            "Первый урок успешно освоен! Вы можете повторить его в любое время."
                        else
                            "Начните с простых приветствий и выучите свои первые 5 татарских слов.",
                        fontSize = 13.sp,
                        color = TatTelMutedText,
                        lineHeight = 18.sp
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    Button(
                        onClick = onStartLesson,
                        colors = ButtonDefaults.buttonColors(
                            containerColor = TatTelGreenPrimary,
                            contentColor = Color.White
                        ),
                        shape = RoundedCornerShape(14.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(48.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.PlayArrow,
                            contentDescription = null,
                            modifier = Modifier.size(20.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = if (isLessonCompleted) "Повторить урок «Приветствия»" else "Продолжить обучение",
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Medium
                        )
                    }
                }
            }
        }

        // Блок со списком уроков
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Доступные уроки",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = TatTelDarkText
                )
                TextButton(onClick = onNavigateToLessons) {
                    Text(
                        text = "Все уроки",
                        color = TatTelGreenPrimary,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }

        // Карточка урока "Приветствия"
        item {
            val greetingsLesson = LessonRepository.lessons.first()
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onStartLesson() }
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(46.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(TatTelLightGreen),
                        contentAlignment = Alignment.Center
                    ) {
                        if (isLessonCompleted) {
                            Icon(
                                imageVector = Icons.Default.CheckCircle,
                                contentDescription = null,
                                tint = TatTelGreenPrimary
                            )
                        } else {
                            Text(
                                text = "1",
                                fontWeight = FontWeight.Bold,
                                color = TatTelGreenPrimary,
                                fontSize = 18.sp
                            )
                        }
                    }

                    Spacer(modifier = Modifier.width(14.dp))

                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = greetingsLesson.title,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = TatTelDarkText
                        )
                        Text(
                            text = "${greetingsLesson.wordCount} практических слов",
                            fontSize = 13.sp,
                            color = TatTelMutedText
                        )
                    }

                    Icon(
                        imageVector = Icons.Default.ArrowForward,
                        contentDescription = "Перейти",
                        tint = TatTelGreenPrimary
                    )
                }
            }
        }

        // Предпросмотр будущего урока
        item {
            val secondLesson = LessonRepository.lessons[1]
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFFF0EFEB)),
                elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(46.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(Color(0xFFE2E0D8)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Lock,
                            contentDescription = "Закрыто",
                            tint = Color.Gray,
                            modifier = Modifier.size(20.dp)
                        )
                    }

                    Spacer(modifier = Modifier.width(14.dp))

                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = secondLesson.title,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = Color.Gray
                        )
                        Text(
                            text = "Скоро появится",
                            fontSize = 12.sp,
                            color = Color.Gray
                        )
                    }
                }
            }
        }
    }
}
