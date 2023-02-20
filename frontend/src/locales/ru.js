const translation = {
  forms: {
    loginHeader: 'Логин',
    loginFooterNoAcc: 'Нет аккаунта?',
    usernameLabel: 'Имя пользователя',
    usernickLabel: 'Ваш ник',
    passwordLabel: 'Пароль',
    messagesInput: 'Новое сообщение',
    messagesInputPlaceholder: 'Введите сообщение...',
    signupHeader: 'Регистрация',
    passwordConfirmation: 'Подтвердите пароль',
  },
  controls: {
    loginButton: 'Войти',
    loginFooterRegLink: 'Регистрация',
    navLogo: 'Hexlet Chat',
    navLogout: 'Выйти',
    dropDownChannelRemove: 'Удалить',
    dropDownChannelRename: 'Переименовать',
    messagesSendInput: 'Отправить',
    signup: 'Зарегистрироваться',
    editChannel: 'Управление каналом',
  },
  feedback: {
    invalidLoginAttempt: 'Неверные имя пользователя или пароль',
    invalidChannelName: 'Канал с таким именем уже существует',
    validationMin3: 'Минимум 3 символа',
    validationMax20: 'Максимум 20 символов',
    validationRequired: 'Обязательное поле',
    validationRange6: 'Не менее 6 символов',
    validationCoincidence: 'Пароли должны совпадать',
    userAlreadyExists: 'Такой пользователь уже существует',
    noNetwork: 'Ошибка соединения',
    channelAdded: 'Канал создан',
    channelRemoved: 'Канал удалён',
    channelRenamed: 'Канал переименован',
    pageNotfound: 'Страница не найдена',
    pathNoticeText: 'Но вы можете перейти',
    pathNoticeLink: 'на главную страницу',
  },
  panes: {
    channelsHeader: 'Каналы',
    messagesHeader_one: '{{count}} сообщение',
    messagesHeader_few: '{{count}} сообщения',
    messagesHeader_many: '{{count}} сообщений',
  },
  modals: {
    save: 'Сохранить',
    close: 'Закрыть',
    remove: 'Удалить',
    addTitle: 'Добавить канал',
    removeTitle: 'Удалить канал',
    renameTitle: 'Переименовать канал',
    inputPlaceholder: 'Имя канала',
    removeReadOnlyText: 'Вы собираетесь удалить канал: {{name}}',
  },
};

export default translation;
