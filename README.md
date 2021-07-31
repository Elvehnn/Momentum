# Momentum
- аналог одноимённого приложения интернет-магазина Chrome. Приложение показывает время, дату, имя пользователя, его цель на текущий день, погоду в определенной локации и случайные советы. 
# Фоновое изображение 
плавно меняется в зависимости от времени суток при смене часа. Можно пролистать все изображения за сутки, нажимая кнопку в верхнем левом углу. Можно выбрать на текущий час другое изображение из набора изображений на день. Текущий набор фоновых картинок меняется при обновлении страницы.
# Имя пользователя и цель на день
запоминаются, если после ввода нажать клавишу Enter. При перезагрузке приложения данные сохраняются. Если пользователь ничего не ввёл или ввёл пустую строку, текст восстанавливается.
# Блок с погодой 
отображает погоду в введенной локации - температуру, облачность в виде иконочного шрифта и описание. Данные берутся из https://home.openweathermap.org. Если пользователь вводит пустую строку, данные не меняются, отображается прежний прогноз погоды. Если пользователь вводит данные, для которых API погоды не возвращает результат, выводится уведомление об ошибке.
# Блок с советом
выводит совет или высказывание при загрузке приложения внизу экрана. При перезагрузке страницы или по клику на кнопке цитата заменяется на другую (API работает медленно, стоит запрет на нажим кнопки чаще, чем раз в 2 секунды).

В ходе выполнения проекта освоена работа с датой и временем, создание часов, сохранение данных в local storage и асинхронные запросы.
