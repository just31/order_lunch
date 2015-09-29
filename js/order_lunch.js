$(document).ready(function() {

    'use strict';

    // Обработки по первому select.
    $('#salad').change(function() {

        // Показываем таблицу, с выводом выбранных блюд и общей суммой заказа
        $(".table-bordered, .heading").fadeIn(1000);
        // Очищаем в таблице, поле для вывода названия салата, чтобы не было дублирования значений
        $("div.table-order").find("#order__salad").empty();

        // Показываем дополнительнуюю ссылку внизу справа под формой, с возможностью обновления страницы.
        $(".update__link").css({'opacity' : '1'});

        // Получаем выбранное значение в списке салатов и название салата
        var salad = $('select[name=salad] option:selected').val(),
            salad_text = $('select[name=salad] option:selected').html();

        // Делаем обработки по второму полю "Цезарь", с подгрузкой дополнительного списка. С наполнениями для данного вида салата.
        if (salad === '2') {
            $(".cesar-salad").before("<p class='cesar-salad-before'>Выбрать наполнение:</p>");
            // Показываем плавно, дополнительный select, с наполнениями для салата
            $('#cesar-salad').animate({'opacity' : '.99'}, 1000);
            // Делаем отступы, перед следующим списком с первыми блюдами
            $(".control-label[for='first-course']").css({'margin-top' : '0'});
            $(".first-course").css({'margin-top' : '13px'});

            // Добавляем выбранное значение "Цезарь", в соответствующее поле итоговой таблицы
            $("div.table-order").find("#order__salad").append(salad_text);

            // Отслеживаем событие выбора, в списке с наполнениями
            $('#cesar-salad').change(function() {
                $("div.table-order").find("#order__salad").empty();

                // Получаем выбранное значение в списке наполнений и название наполнителя
                var greek__salad = $('select[name=cesar-salad] option:selected').val(),
                    greek__salad_text = $('select[name=cesar-salad] option:selected').text();

                // Если выбрано не пустое значение в списке, выводим салат "Цезарь", с наполнителем.
                if (greek__salad !== '0') {
                    $("div.table-order").find("#order__salad").append(salad_text + ", наполнение " + greek__salad_text);
                }
            });
        }
        else {
            // Скрываем список и строку с вводным текстом "Выбрать наполнение:". И обнуляем значение списка.
            $('#cesar-salad, .cesar-salad-before').animate({'opacity' : '0'}, 500);
            $("select[name=cesar-salad]").val('0');
        }

        // Если выбран первый салат из списка, выводим его название в соответствующее поле итоговой таблицы. Предварительно его очистив.
        if (salad === '1') {
            $("div.table-order").find("#summa__order").empty();
            $("div.table-order").find("#order__salad").append("греческий (100р)");
        }

    });


    // Обработки по второму select.
    $('#first-course').change(function() {

        $(".table-bordered, .heading").fadeIn(1000);
        $("div.table-order").find("#order__first").empty();
        $(".update__link").css({'opacity' : '1'});

        var first__course = $('select[name=first-course] option:selected').val(),
            first__course_text = $('select[name=first-course] option:selected').html();

        if (first__course !== '0') {
            $("div.table-order").find("#order__first").append(first__course_text);
        }

    });


    // Обработки по третьему select. К данному списку по вторым блюдам, добавлены 2 дополнительных списка: "Степень прожарки" и "Гарнир".
    $('#second-course').change(function() {

        $(".table-bordered, .heading").fadeIn(1000);
        $("div.table-order").find("#order__second").empty();
        $(".update__link").css({'opacity' : '1'});
        // Обнуляем значения дополнительных списков, при каждом новом срабатывании события 'change'. Чтобы обновлялись значения данных списков, при последующих выборах, в списке вторых блюд.
        $("select[name=degree-roasting]").val('0');
        $("select[name=garnish]").val('0');

        var second_course = $('select[name=second-course] option:selected').val(),
            second_course_text = $('select[name=second-course] option:selected').html();

        // Если выбрано не пустое значение в списке, выводим название второго блюда, с дополнительными опциями(прожарка, гарнир).
        if (second_course !== '0') {
            $("p.degree-roasting-before").empty();
            $("#degree-roasting").animate({'opacity' : '.99'}, 1000);
            $(".second-course__garnish").fadeIn(1000);
            $(".second-course__degree-roasting").before("<p class='degree-roasting-before'>Степень прожарки:</p>");
            $(".control-label[for='second-course']").css({'margin-top' : '5px'});

            $("div.table-order").find("#order__second").append(second_course_text);

            var degree__roasting_text,
                garnish__roasting_text;

            // Обработка первого доп. списка по степени прожарки
            $('#degree-roasting').change(function() {
                $("div.table-order").find("#order__second").empty();
                var degree__roasting = $('select[name=degree-roasting] option:selected').val();
                degree__roasting_text = $('select[name=degree-roasting] option:selected').text();

                if (degree__roasting !== '0') {
                    if((typeof garnish__roasting_text == "undefined")) {
                        $("div.table-order").find("#order__second").append(second_course_text + "<br> степень прожарки " + degree__roasting_text);
                    }
                    else {
                        $("div.table-order").find("#order__second").append(second_course_text + "<br> степень прожарки " + degree__roasting_text + "<br> гарнир ко второму " + garnish__roasting_text);
                    }
                }
            });

            // Обработка второго доп. списка по гарнирам
            $('#garnish').change(function() {
                $("div.table-order").find("#order__second").empty();
                var garnish = $('select[name=garnish] option:selected').val();
                garnish__roasting_text = $('select[name=garnish] option:selected').text();

                if (garnish !== '0') {
                    if((typeof degree__roasting_text == "undefined")) {
                        $("div.table-order").find("#order__second").append(second_course_text + "<br> гарнир ко второму " + garnish__roasting_text);
                    }
                    else {
                        $("div.table-order").find("#order__second").append(second_course_text + "<br> степень прожарки " + degree__roasting_text + "<br> гарнир ко второму " + garnish__roasting_text);
                    }
                }
            });
        }
        else {
            // Скрываем списки и строки с вводными текстами, к дополнительным опциям.
            $('#degree-roasting, .degree-roasting-before').animate({'opacity' : '0'}, 500);
            $(".second-course__garnish").fadeOut(1000);
        }

    });


    // Обработки по четвертому select. К данному списку по напиткам, добавлено несколько дополнительных опций. В зависимости от типа напитка. К соку, выбор названия сока.
    // К кофе и чаю, выбор марки/типа и дополнительный чекбокс с возможностью добавлять сахар или нет.
    $('#beverage').change(function() {

        // Производим различные действия: показываем итоговую таблицу, очищаем поле для вывода значения напитка, обнуляем значения доп. списков при повторных произведениях выбора.
        // Показываем ссылку на обновление страницы.
        $(".table-bordered, .heading").fadeIn(1000);
        $("div.table-order").find("#beverage").empty();
        $("select[name=beverage-juice]").val('0');
        $("select[name=beverage-coffee]").val('0');
        $("select[name=beverage-tea]").val('0');
        $(".update__link").css({'opacity' : '1'});

        // Получение значений и их названий из списка напитков.
        var beverage = $('select[name=beverage] option:selected').val(),
            beverage_text = $('select[name=beverage] option:selected').html();
            //console.log(beverage);

        // Создаем дополнительные переменные, для вывода названий сока, кофе и чая.
        var beverage__juice_text,
            beverage__coffee_text,
            beverage__tea_text;

        // Обработки по первому значению списка "Сок".
        if (beverage === '1') {
            // Производим различные действия: добавляем вводный текст, к списку с выбором сока, показываем данный список, скрываем списки с выбором кофе и чая.
            // Скрываем чекбокс, с добавлением сахара, скрываем вводные тексты, для списков с выбором кофе и чая. Добавляем доп. отступ, перед списком с выбором хлеба.
            $(".beverage-juice").before("<p class='beverage-before-juice'>Выбрать сок:</p>");
            $(".beverage-juice").fadeIn(1000);
            // Устанавливаем высокое значение z-index, для того чтобы список с выбором сока, был поверх других 2-ух списков. При последующем выборе значения "Сок", в списке напитков.
            $(".beverage-juice").css({'z-index' : '102'});
            $(".beverage-coffee").fadeOut(500);
            $(".beverage-tea").fadeOut(500);
            $(".sugar").fadeOut(500);
            $('.beverage-before-coffee, .beverage-before-tea').animate({'opacity' : '0'}, 500);
            $(".bread").css({'margin-top' : '13px'});

            // Выводим в соответствующее поле итоговой таблицы, "Сок".
            $("div.table-order").find("#beverage").append(beverage_text);

            // Обработки по дополнительному списку, с выбором названия сока.
            $('#beverage-juice').change(function() {
                $("div.table-order").find("#beverage").empty();
                var beverage__juice = $('select[name=beverage-juice] option:selected').val();
                beverage__juice_text = $('select[name=beverage-juice] option:selected').text();

                // Выводим в соотвествующее поле итоговой таблицы, выбранный сок.
                $("div.table-order").find("#beverage").append(beverage_text + "<br> " + beverage__juice_text);

            });

        }
        // Обработки по второму значению списка "Кофе".
        else if (beverage === '2') {
            // Производим различные действия: добавляем вводный текст, к списку с выбором кофе, показываем данный список, скрываем списки с выбором сока и чая.
            // Показываем чекбокс, с добавлением сахара, скрываем вводные тексты, для списков с выбором сока и чая. Добавляем доп. отступ, перед списком с выбором хлеба.
            $(".beverage-coffee").before("<p class='beverage-before-coffee'>Выбрать марку:</p>");
            $(".beverage-coffee").fadeIn(1000);
            // Устанавливаем чуть меньшее значение z-index, чем у сока, для списка с выбором кофе.
            // Для того, чтобы он был поверх списка чая. При новом выборе значения "Кофе", в списке напитков.
            $(".beverage-coffee").css({'z-index' : '101'});
            $(".beverage-juice").fadeOut(500);
            $(".beverage-tea").fadeOut(500);
            $(".sugar").fadeIn(1000);
            $('.beverage-before-juice, .beverage-before-tea').animate({'opacity' : '0'}, 500);
            $(".bread").css({'margin-top' : '39px'});

            // Убираем галочку с чекбокса, по добавлению сахара. Чтобы оно совпадало со значением по умолчанию. При новом выборе в списке напитков.
            $("#checkboxes_sugar").removeAttr("checked");

            // Создаем дополнительную переменную, для вывода по умолчанию значения сахара.
            //var sugar,
            var sugar__text = "нет";

            // Выводим в соответствующее поле итоговой таблицы, "Кофе", со значением сахара, по умолчанию.
            $("div.table-order").find("#beverage").append(beverage_text + "<br> - сахар: " + sugar__text);

            // Обработки по дополнительному списку, с выбором марки кофе. И выводом ее, в соответствующем поле итоговой таблицы.
            $('#beverage-coffee').change(function() {
                $("div.table-order").find("#beverage").empty();
                var beverage__coffee = $('select[name=beverage-coffee] option:selected').val();
                beverage__coffee_text = $('select[name=beverage-coffee] option:selected').text();

                // Убираем галочку с чекбокса, по добавлению сахара, при новом выборе в списке видов чая.
                $("#checkboxes_sugar").removeAttr("checked");

                $("div.table-order").find("#beverage").append(beverage_text + "<br> " + beverage__coffee_text + "<br> - сахар: " + sugar__text);

            });

            // Обработки чекбокса, с возможностью добавлять сахар.
            $('input:checkbox').click(function() {
                var $this = $(this);

                if ($this.is(':checked')) {
                    $("div.table-order").find("#beverage").empty();

                    if((typeof beverage__coffee_text == "undefined")) {
                        $("div.table-order").find("#beverage").append(beverage_text + "<br> - сахар: да");
                    }
                    else {
                        $("div.table-order").find("#beverage").append(beverage_text + "<br> " + beverage__coffee_text + "<br> - сахар: да");
                    }
                } else {
                    $("div.table-order").find("#beverage").empty();

                    if((typeof beverage__coffee_text == "undefined")) {
                        $("div.table-order").find("#beverage").append(beverage_text + "<br> - сахар: нет");
                    }
                    else {
                        $("div.table-order").find("#beverage").append(beverage_text + "<br> " + beverage__coffee_text + "<br> - сахар: нет");
                    }
                }
            });
        }
        // Обработки по третьему значению списка "Чай".
        else if (beverage === '3') {
            // Производим различные действия: добавляем вводный текст, к списку с выбором чая, показываем данный список, скрываем списки с выбором кофе и сока.
            // Показываем чекбокс, с добавлением сахара, скрываем вводные тексты, для списков с выбором сока и кофе. Добавляем доп. отступ, перед списком с выбором хлеба.
            $(".beverage-tea").before("<p class='beverage-before-tea'>Выбрать чай:</p>");
            $(".beverage-tea").fadeIn(1000);
            $(".beverage-tea").css({'z-index' : '100'});
            $(".beverage-coffee").fadeOut(500);
            $(".beverage-juice").fadeOut(500);
            $(".sugar").fadeIn(1000);
            $('.beverage-before-juice, .beverage-before-coffee').animate({'opacity' : '0'}, 500);
            $(".bread").css({'margin-top' : '39px'});

            // Убираем галочку с чекбокса, по добавлению сахара. Чтобы оно совпадало со значением по умолчанию. При новом выборе в списке напитков.
            $("#checkboxes_sugar").removeAttr("checked");

            // Создаем дополнительную переменную, для вывода по умолчанию значения сахара.
            //var sugar,
            var sugar__text = "нет";

            // Выводим в соответствующее поле итоговой таблицы, "Чай", со значением сахара, по умолчанию.
            $("div.table-order").find("#beverage").append(beverage_text + "<br> - сахар: " + sugar__text);

            // Обработки по дополнительному списку, с выбором вида чая. И выводом его, в соответствующем поле итоговой таблицы.
            $('#beverage-tea').change(function() {
                $("div.table-order").find("#beverage").empty();
                var beverage__tea = $('select[name=beverage-tea] option:selected').val();
                beverage__tea_text = $('select[name=beverage-tea] option:selected').text();

                // Убираем галочку с чекбокса, по добавлению сахара, при новом выборе в списке марок кофе.
                $("#checkboxes_sugar").removeAttr("checked");

                $("div.table-order").find("#beverage").append(beverage_text + "<br> " + beverage__tea_text + "<br> - сахар: " + sugar__text);

            });

            // Обработки чекбокса, с возможностью добавлять сахар. По данному значению списка напитков.
            $('input:checkbox').click(function() {
                var $this = $(this);

                if ($this.is(':checked')) {
                    $("div.table-order").find("#beverage").empty();

                    if((typeof beverage__tea_text == "undefined")) {
                        $("div.table-order").find("#beverage").append(beverage_text + "<br> - сахар: да");
                    }
                    else {
                        $("div.table-order").find("#beverage").append(beverage_text + "<br> " + beverage__tea_text + "<br> - сахар: да");
                    }
                } else {
                    $("div.table-order").find("#beverage").empty();

                    if((typeof beverage__tea_text == "undefined")) {
                        $("div.table-order").find("#beverage").append(beverage_text + "<br> - сахар: нет");
                    }
                    else {
                        $("div.table-order").find("#beverage").append(beverage_text + "<br> " + beverage__tea_text + "<br> - сахар: нет");
                    }
                }
            });
        }
        // Если выбрано нулевое значение из списка напитков, скрываем дополнительные поля. И обнуляем в них значения.
        else {
            if (beverage === '0') {
                $('.beverage-before-juice').animate({'opacity' : '0'}, 500);
                $(".beverage-juice").fadeOut(500);
                $("select[name=beverage-juice]").val('0');


                $('.beverage-before-coffee').animate({'opacity' : '0'}, 500);
                $(".beverage-coffee").fadeOut(500);
                $("select[name=beverage-coffee]").val('0');

                $('.beverage-before-tea').animate({'opacity' : '0'}, 500);
                $(".beverage-tea").fadeOut(500);
                $("select[name=beverage-tea]").val('0');

                $(".sugar").fadeOut(500);
            }
        }

    });


    // Обработки по пятому select.
    $('#bread').change(function() {
        $(".table-bordered, .heading").fadeIn(1000);
        $("div.table-order").find("#bread").empty();
        $(".update__link").css({'opacity' : '1'});

        var bread__text = $('select[name=bread] option:selected').html();

        if (bread !== '0') {
            $("div.table-order").find("#bread").append(bread__text);
        }
    });


    // Подсчет общей суммы заказа обеда.
    $('form[name=lunch]').change(function() {

        // Переменная, для вывода общей суммы.
        var main__summa;

        // Очищаем каждый раз, при любом изменении значений полей в форме, итогое поле для вывода общей суммы.
        $("div.table-order").find("#summa__order").empty();
        // Обнуляем также значение переменной main__summa.
        main__summa = 0;


        // Далее собираем текущие значения всех числовых полей формы и суммируем их.

        var salad = $('select[name=salad] option:selected').val();
        if(salad == '1'){salad = 100}
        if(salad == '2'){salad = ''}

        var cesar__salad = $('select[name=cesar-salad] option:selected').val();
        if(cesar__salad == '1'){cesar__salad = 100}
        if(cesar__salad == '2'){cesar__salad = 150}

        var first__course = $('select[name=first-course] option:selected').val();
        if(first__course == '1'){first__course = 100}
        if(first__course == '2'){first__course = 5}
        if(first__course == '3'){first__course = 70}
        if(first__course == '4'){first__course = 60}

        var second_course = $('select[name=second-course] option:selected').val();
        if(second_course == '1'){second_course = 100}
        if(second_course == '2'){second_course = 120}
        if(second_course == '3'){second_course = 150}
        if(second_course == '4'){second_course = 150}

        var garnish = $('select[name=garnish] option:selected').val();
        if(garnish == '1'){garnish = 50}
        if(garnish == '2'){garnish = 30}
        if(garnish == '3'){garnish = 30}

        var beverage__juice = $('select[name=beverage-juice] option:selected').val();
        if(beverage__juice == '1'){beverage__juice = 50}
        if(beverage__juice == '2'){beverage__juice = 50}

        var beverage__coffee = $('select[name=beverage-coffee] option:selected').val();
        if(beverage__coffee == '1'){beverage__coffee = 80}
        if(beverage__coffee == '2'){beverage__coffee = 80}

        var beverage__tea = $('select[name=beverage-tea] option:selected').val();
        if(beverage__tea == '1'){beverage__tea = 30}
        if(beverage__tea == '2'){beverage__tea = 30}

        var bread = $('select[name=bread] option:selected').val();
        if(bread == '1'){bread = 10}
        if(bread == '2'){bread = 10}

        main__summa = +salad + +cesar__salad + +first__course + +second_course + +garnish + +beverage__juice + +beverage__coffee + +beverage__tea + +bread;

        // Выводим общую сумму заказа
        $("div.table-order").find("#summa__order").append(main__summa + " р.");

    });

});