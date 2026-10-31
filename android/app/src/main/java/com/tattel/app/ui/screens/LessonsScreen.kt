package com.tattel.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
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
fun LessonsScreen(
    isFirstLessonCompleted: Boolean,
    onStartLesson: () -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 20.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
        contentPadding = PaddingValues(top = 24.dp, bottom = 32.dp)
    ) {
        item {
            Column {
                Text(
                    text = "Тематические уроки",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    color = TatTelDarkText
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "Пройдите первый урок для освоения основ",
                    fontSize = 15.sp,
                    color = TatTelMutedText
                )
            }
            Spacer(modifier = Modifier.height(10.dp))
        }

        itemsIndexed(LessonRepository.lessons) { index, lesson ->
            val isAvailable = lesson.isAvailable
            val isCompleted = isAvailable && isFirstLessonCompleted

            Card(
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(
                    containerColor = if (isAvailable) Color.White else Color(0xFFF1EFEA)
                ),
                elevation = CardDefaults.cardElevation(
                    defaultElevation = if (isAvailable) 1.dp else 0.dp
                ),
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable(enabled = isAvailable) {
                        onStartLesson()
                    }
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(18.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(50.dp)
                            .clip(RoundedCornerShape(14.dp))
                            .background(
                                if (isAvailable) TatTelLightGreen else Color(0xFFE2E0D8)
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        if (isCompleted) {
                            Icon(
                                imageVector = Icons.Default.CheckCircle,
                                contentDescription = "Завершено",
                                tint = TatTelGreenPrimary
                            )
                        } else if (isAvailable) {
                            Text(
                                text = "${index + 1}",
                                fontSize = 18.sp,
                                fontWeight = FontWeight.Bold,
                                color = TatTelGreenPrimary
                            )
                        } else {
                            Icon(
                                imageVector = Icons.Default.Lock,
                                contentDescription = "Заблокировано",
                                tint = Color.Gray,
                                modifier = Modifier.size(20.dp)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.width(16.dp))

                    Column(modifier = Modifier.weight(1f)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = lesson.title,
                                fontSize = 16.sp,
                                fontWeight = FontWeight.SemiBold,
                                color = if (isAvailable) TatTelDarkText else Color.Gray
                            )
                            if (!isAvailable) {
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(
                                    text = "Скоро",
                                    fontSize = 11.sp,
                                    color = Color.Gray
                                )
                            }
                        }
                        Spacer(modifier = Modifier.height(2.dp))
                        Text(
                            text = lesson.subtitle,
                            fontSize = 13.sp,
                            color = if (isAvailable) TatTelMutedText else Color(0xFF8A9188)
                        )
                    }

                    if (isAvailable) {
                        FilledIconButton(
                            onClick = onStartLesson,
                            colors = IconButtonDefaults.filledIconButtonColors(
                                containerColor = TatTelGreenPrimary,
                                contentColor = Color.White
                            ),
                            modifier = Modifier.size(36.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.PlayArrow,
                                contentDescription = "Начать урок",
                                modifier = Modifier.size(18.dp)
                            )
                        }
                    }
                }
            }
        }
    }
}
