const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const { default: mongoose } = require('mongoose');
const Card = require('../models/card');
const BadRequestStatus = require('../errors/BadRequestStatus');
const NotFoundStatus = require('../errors/NotFoundStatus');
const ForbiddenStatus = require('../errors/ForbiddenStatus');
const NotValidIdStatus = require('../errors/NotValidIdStatus');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch(next);
};

module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .orFail()
        .then((data) => res.status(HTTP_STATUS_CREATED).send(data))
        .catch((err) => {
          if (err instanceof mongoose.Error.DocumentNotFoundError) {
            next(new NotFoundStatus('Карточка с указанным _id не найдена.'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestStatus(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundStatus('Карточка с указанным _id не найдена.'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenStatus('Карточка другого пользователя.');
      }
      Card.deleteOne(card)
        .then(() => {
          res.status(HTTP_STATUS_OK).send({ message: 'Карточка удалена.' });
        })
        .catch((err) => {
          // if (err instanceof mongoose.Error.DocumentNotFoundError) {
          //   next(new NotFoundStatus('Карточка с указанным _id не найдена.'));
          // } else {
          //   next(err);
          // }
          next(err);
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestStatus('Некорректный _id карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    // .orFail(new NotValidIdStatus('NotValidId'))
    .orFail(new NotFoundStatus('Карточка с указанным _id не найдена.'))
    .then((card) => {
      res.status(HTTP_STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestStatus('Некорректный _id карточки.'));
      // } else if (err.message === 'NotValidId') {
      //   next(new NotFoundStatus('Карточка с указанным _id не найдена.'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    // .orFail(new NotValidIdStatus('NotValidId'))
    .orFail(new NotFoundStatus('Карточка с указанным _id не найдена.'))
    .then((card) => {
      res.status(HTTP_STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestStatus('Некорректный _id карточки.'));
      // } else if (err.message === 'NotValidId') {
      //   next(new NotFoundStatus('Карточка с указанным _id не найдена.'));
      } else {
        next(err);
      }
    });
};
