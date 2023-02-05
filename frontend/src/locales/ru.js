const translation = {
  forms: {
    loginHeader: 'Войти',
    loginFooterNoAcc: 'Нет аккаунта?',
    usernameLabel: 'Ваш ник',
    passwordLabel: 'Пароль',
    messagesInput: 'Введите сообщение...',
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
  },
  feedback: {
    invalidLoginAttempt: 'Неверные имя пользователя или пароль',
    invalidChannelName: 'Канал с таким именем уже существует',
    validationMin3: 'От 3 до 20 символов',
    validationMax20: 'От 3 до 20 символов',
    validationRequired: 'Обязательное поле',
    validationRange6: 'Не менее 6 символов',
    validationCoincidence: 'Пароли должны совпадать',
    userAlreadyExists: 'Такой пользователь уже существует',
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
    inputPlaceholder: 'Введите название канала',
    removeReadOnlyText: 'Канал для удаления: {{name}}',
  },
};

export default translation;
