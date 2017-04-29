'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngSanitize', 'dndLists'])


    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])
    .filter('stopwatchTime', function () {
        return function (input) {
            if (input) {

                var elapsed = input.getTime();

                var hours = parseInt(elapsed / 3600000, 10);
                elapsed %= 3600000;
                var mins = parseInt(elapsed / 60000, 10);
                elapsed %= 60000;
                var secs = parseInt(elapsed / 1000, 10);

                return hours + ':' + mins + ':' + secs;
            }
        };
    })
    .directive("directive", function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ngModel) {

                function handlePaste(e) {
                    var clipboardData, pastedData;

                    // Stop data actually being pasted into div
                    e.stopPropagation();
                    e.preventDefault();

                    // Get pasted data via clipboard API
                    clipboardData = e.clipboardData || window.clipboardData;
                    pastedData = clipboardData.getData('Text');

                    // Do whatever with pasteddata
                    alert(pastedData);
                }

                function read() {
                    // view -> model
                    var html = element.html().replace(/<[^>]*>/g, "");
                    html = html.replace(/&nbsp;/g, "\u00a0");
                    ngModel.$setViewValue(html);
                }

                // element.addEventListener('paste', handlePaste);
                // model -> view
                ngModel.$render = function () {
                    element.html(ngModel.$viewValue || "");
                };
                element.bind("pasteasdf", function (e) {
                    var clipboardData, pastedData;
                    // Stop data actually being pasted into div
                    e.stopPropagation();
                    e.preventDefault();

                    // Get pasted data via clipboard API
                    clipboardData = e.clipboardData || window.clipboardData;
                    pastedData = clipboardData.getData('Text');

                    // Do whatever with pasteddata
                    alert(pastedData);
                });
                element.on('paste', function (e) {
                    e.preventDefault();
                    var text;
                    var clp = (e.originalEvent || e).clipboardData;
                    if (clp === undefined || clp === null) {
                        text = window.clipboardData.getData("text") || "";
                        if (text !== "") {
                            text = text.replace(/<[^>]*>/g, "");
                            if (window.getSelection) {
                                var newNode = document.createElement("span");
                                newNode.innerHTML = text;
                                window.getSelection().getRangeAt(0).insertNode(newNode);
                            } else {
                                document.selection.createRange().pasteHTML(text);
                            }
                        }
                    } else {
                        text = clp.getData('text/plain') || "";
                        if (text !== "") {
                            text = text.replace(/<[^>]*>/g, "");
                            document.execCommand('insertText', false, text);
                        }
                    }
                });

                element.bind("blur keyup change", function () {
                    scope.$apply(read);
                });
                element.bind("keydown keypress", function (event) {
                    if (event.which === 13) {
                        this.blur();
                        event.preventDefault();
                    }
                });
            }
        };
    })
    .directive('bbStopwatch', ['StopwatchFactory', function (StopwatchFactory) {
        return {
            restrict: 'EA',
            scope: true,
            link: function (scope, elem, attrs) {

                var stopwatchService = new StopwatchFactory(scope[attrs.options]);

                scope.startTimer = stopwatchService.startTimer;
                scope.stopTimer = stopwatchService.stopTimer;
                scope.resetTimer = stopwatchService.resetTimer;

                scope.startTimer();

            }
        };
    }])
    .factory('StopwatchFactory', ['$interval', function ($interval) {

        return function (options) {

            var startTime = 0,
                currentTime = null,
                offset = (new Date(options.elapsedTime)).getTime(),
                interval = null,
                self = this;
            if (!options.interval) {
                options.interval = 100;
            }
            console.log(options.elapsedTime);
            // if(typeof (options.elapsedTime) == ) {
            options.elapsedTime = new Date(0);
            // }

            self.running = false;

            function pushToLog(lap) {
                if (options.log !== undefined) {
                    options.log.push(lap);
                }
            }

            self.updateTime = function () {
                currentTime = new Date().getTime();
                var timeElapsed = offset + (currentTime - startTime);
                options.elapsedTime.setTime(timeElapsed);
            };

            self.startTimer = function () {
                if (self.running === false) {
                    startTime = new Date().getTime();
                    interval = $interval(self.updateTime, options.interval);
                    self.running = true;
                }
            };

            self.stopTimer = function () {
                if (self.running === false) {
                    return;
                }
                self.updateTime();
                offset = offset + currentTime - startTime;
                pushToLog(currentTime - startTime);
                $interval.cancel(interval);
                self.running = false;
            };

            self.resetTimer = function () {
                startTime = new Date().getTime();
                options.elapsedTime.setTime(0);
                var timeElapsed = offset = 0;
            };

            self.cancelTimer = function () {
                $interval.cancel(interval);
            };

            return self;

        };


    }])
    .controller('View1Ctrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (!current) {
            }
            // handle session start event
        });
        window.onbeforeunload = function () {

            alert();
            if (confirm('Are you sure you want to save this thing into the database?')) {
                // Save it!
            } else {
                // Do nothing!
            }            // handle the exit event
        };
        //$scope.thesis = 'my beautiful thesis';
        var config;

        $scope.service_save = function () {
            setInterval(function () {
                console.log($scope.essay, 'autosaved');
                $scope.alert_flag_message = 'Autosaved successfully';
                if (typeof (essay_id ) === 'undefined') {
                    $scope.add_new_essay();
                } else {
                    if (typeof ($scope.essay.title) === 'undefined') {
                        $scope.essay.title = $scope.essay.prompt;
                    }
                    $scope.update_selected_essay();
                }
            }, 60000);

        };
        $scope.initialise_my_vars = function () {
            $scope.framework = {};
            $scope.framework.element_id = ['Prompt', 'Theme', 'Brainstorm', 'Organisation', 'Outline', 'Redaction', 'Render', 'IC'];
            $scope.alert_flag = $('#alert_flag_notification');
            $scope.essay = {};
            $scope.essay.outline = {
                selected: null,
                templates: [
                    {type: "item", id: 1},
                    {type: "container", id: 1, "active":true, "content": "Bucket", columns: [[{type: "item", id: 1}]]}
                ],
                dropzones: {
                    "Idea Box": [],
                    "Off Topic Box": [{type: "item", id: 1}],
                    "Buckets": [

                        {
                            "content": "Bucket 1",
                            "type": "container",
                            "id": "1",
                            "columns": [
                                [{type: "item", id: 1}]
                            ]
                        }
                    ]
                }

            };
            $scope.essay.keywords = [];
            $scope.essay.introduction = {};
            $scope.essay.conclusion = {};
            $scope.essay.stopwatches = [{log: [], elapsedTime: new Date(0)}];
            $scope.essay.outline.dropzones['Idea Box'] = [{
                'type': 'item',
                'id': 'default'
            }, {'type': 'item'}, {'type': 'item'}];
            config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            };

        };
        $scope.initialise_my_functions = function () {
            $scope.print_debug = function () {
                console.log($scope.essay, 'essay summary');
                console.log($scope.essay.outline, 'essay.outline');
                console.log($scope.essay.stopwatches)
            };
            $scope.errorCallback = function () {
                alert('an error has occured while contacting the server');
            };
            $scope.print_error_log = function (data) {
                $scope.error_logs = data;
                // console.log(data);
            };
            $scope.initialise_model_json = function () {

                $scope.$watch('essay.outline.dropzones', function (model) {
                    $scope.modelAsJson = $scope.essay.outline.dropzones;
                    $scope.split_keyword($scope.essay.outline.dropzones['Idea Box'], $scope.essay.word_limit);
                }, true);

            }

        };

        $scope.initialise_user_functions = function () {
            $scope.show_alert = function (element) {
                element.fadeIn(400).delay(3000).fadeOut(400);
            };
            $scope.copy_to_clipboard = function (text_to_copy) {
                var targetId = "_hiddenCopyText_";
                target = document.getElementById(targetId);
                if (!target) {
                    var target = document.createElement("textarea");
                    target.style.position = "absolute";
                    target.style.left = "-9999px";
                    target.style.top = "0";
                    target.id = targetId;
                    document.body.appendChild(target);
                }
                target.textContent = text_to_copy;

                // select the content
                var currentFocus = document.activeElement;
                target.focus();
                target.setSelectionRange(0, target.value.length);

                // copy the selection
                var succeed;
                try {
                    succeed = document.execCommand("copy");
                } catch (e) {
                    succeed = false;
                }

                // restore original focus
                if (currentFocus && typeof currentFocus.focus === "function") {
                    currentFocus.focus();
                }

                if (succeed) {
                    console.log('copy successful')
                } else {
                    console.log('copy unsuccessful')
                }
            };
            $scope.copy_rendered = function (item) {

                var text = ($scope.essay_content_toString(item));
                text = ($scope.essay.introduction.rendering || '') + '\n' + text;
                text += '\n' + ($scope.essay.conclusion.rendering || '');
                $scope.copy_to_clipboard(text);
            };
            $scope.essay_content_toString = function (item) {

                var essayStr = '';
                angular.forEach(item, function (value, key) {
                    if (typeof (value.content) === 'undefined' || value.content === '') return '';
                    if (value.type === 'container') {
                        essayStr += (value.rendering || '') + '\n';
                    } else {
                        essayStr += ' '+ value.rendering || '';
                    }
                    if (typeof (value.columns) !== 'undefined' && value.columns.length > 0) {
                        essayStr += $scope.essay_content_toString(value.columns[0]);
                    }
                });
                return essayStr;
            };
            $scope.initialize_word_count = function (item) {
                var regex = /\s+/gi;
                var wordcount = 0;
                if (typeof (item.rendering) !== 'undefined') {
                    wordcount = item.rendering.trim().replace(regex, ' ').split(' ').length;
                }
                item.wordcount = wordcount;
            };
            $scope.slide_navigation_from_arrow = function ($event) {
                var clicked_arrow = $($event.currentTarget);
                var next = Number(clicked_arrow.data('next'));
                if (next === -1) {
                    return null;
                }
                var next_id = $scope.framework.element_id[next];
                var scroll_to_target = $('#' + next_id);
                $('html, body').animate({
                    scrollTop: scroll_to_target.offset().top - 64,
                    scrollLeft: scroll_to_target.offset().left - scroll_to_target.width() / 2
                }, 500);

                if (clicked_arrow.hasClass('navigation-right')) {
                    $('.arrow.navigation-right').data('next', next + 1);
                    $('.arrow.navigation-left').data('next', next - 1);
                } else {
                    $('.arrow.navigation-left').data('next', next - 1);
                    $('.arrow.navigation-right').data('next', next + 1);
                }
            };
            $scope.add_brainstorm_field = function (index) {
                if ($scope.essay.outline.dropzones['Idea Box'].length - 1 === index || typeof (index) === 'undefined') {
                    $scope.essay.outline.dropzones['Idea Box'].push({'type': 'item'});
                }
            };
            $scope.add_item_field = function (list, index) {
                console.log(list[index].content, 'focused item');
                if (list.length - 1 === index || typeof (index) === 'undefined') {
                    if (index === 0 || (typeof (list[index - 1].content) !== 'undefined' && list[index - 1].content !== '') || (typeof (list[index].content ) !== 'undefined' && list[index].content !== '')) {
                        list.push({'type': 'item'});
                    }
                }
            };
            $scope.add_new_essay = function () {
                $http.post('post.php', {
                    'id': 0,
                    'essay_content': $scope.essay,
                    'essay_title': $scope.essay.title,
                    'action': 'save-essay'
                }, config).then(function (data, status, headers, config) {
                    if (data.data === '1') {
                        alert('saved!')
                    }
                    ;
                    $scope.print_error_log(data.data);
                }, $scope.errorCallback);
            };
            $scope.convert_item_to_container = function (item) {
                item.type = 'container';
                item.columns = [[{type: "item", id: 1}]];
            };
            $scope.convert_container_to_item = function (container) {
                if ((typeof (container.columns) === 'undefined') ||(typeof (container.columns[0]) === 'undefined') || (typeof (container.columns[0][0].content) === 'undefined' || container.columns[0][0].content === '' )) {
                    container.type = 'item';
                } else {
                    alert('remove child first');
                }
            };
            $scope.register_keyword = function () {

                var keywords_array = $scope.essay.thesis.split(" ");
                for (var n = 0; n < keywords_array.length; n++) {
                    var kwd = keywords_array[n];
                    if (typeof ($scope.essay.keywords[n]) === 'undefined') {
                        $scope.essay.keywords.push({'label': kwd});
                    } else {
                        $scope.essay.keywords[n].label = kwd;
                    }
                }
                console.log($scope.essay.keywords);
                console.log(keywords_array.length);
            };
            $scope.update_selected_essay = function () {
                var data = {
                    'essay_id': essay_id,
                    'essay_title': $scope.essay.title,
                    'essay_content': $scope.essay,
                    'action': 'update-essay'
                };
                $scope.alert_flag.text($scope.alert_flag_message);

                function successCallback(data) {
                    if (data === '1') {
                        $scope.show_alert($scope.alert_flag);
                    }
                };

                if (typeof (essay_id) !== 'undefined') {

                    $http.post('post.php', data, config).then(function (data, status, headers, config) {
                        successCallback(data.data);
                        $scope.print_error_log(data.data);
                    }, $scope.errorCallback);
                }
            };
            $scope.save_essay = function () {
                $scope.alert_flag_message = 'Essay Saved successfully!';
                if (typeof (essay_id ) === 'undefined') {
                    $scope.add_new_essay();
                } else {
                    $scope.update_selected_essay();
                }
            };
            $scope.split_keyword = function (parent, word_limit) {
                parent = parent.filter(function (el) {
                    return typeof (el.content) !== 'undefined' &&
                        el.content !== '';
                });
                angular.forEach(parent, function (value, key) {
                    value.word_limit = Math.round(word_limit / parent.length);
                    if (typeof (value.columns) !== 'undefined' && value.columns.length > 0) {
                        $scope.split_keyword(value.columns[0], value.word_limit)
                    }
                })
            }
        };


        $scope.get_selected_essay = function (essay_id) {
            var data = {
                'essay_id': essay_id,
                'action': 'fetch-essay'
            };

            function successCallback(data) {
                $scope.temp_essay_templates = angular.copy($scope.essay.outline.templates);
                $scope.essay = Object.assign($scope.essay, data.data);
                $scope.essay.outline.templates = $scope.temp_essay_templates;

                // $scope.essay.outline.dropzones['Idea Box'] = $scope.essay.brainstorm;
            };

            if (typeof (essay_id) !== 'undefined') {

                $http.post('post.php', data, config).then(function (data, status, headers, config) {
                    successCallback(data);
                    $scope.print_error_log(data.data);
                }, $scope.errorCallback);
            }
        };
        $scope.fire = function () {
            $scope.service_save();
            $scope.initialise_my_vars();
            $scope.initialise_my_functions();
            $scope.initialise_user_functions();
            $scope.get_selected_essay(essay_id);
        };
        $scope.fire();


    }]);

