const newMessageSubscribe = (_parent, _args, context) => context.pubsub.subscribe('NEW_MESSAGE');

const newMessage = {
    subscribe: newMessageSubscribe,
    resolve: payload => payload,
};
const newLikesSubscribe = (_parent, _args, context) => context.pubsub.subscribe('CHANGE_LIKES');

const updatedLikes = {
    subscribe: newLikesSubscribe,
    resolve: payload => payload,
};

const newDislikesSubscribe = (_parent, _args, context) => context.pubsub.subscribe('CHANGE_DISLIKES');

const updatedDislikes = {
    subscribe: newDislikesSubscribe,
    resolve: payload => payload,
};

module.exports = {
    newMessage,
    updatedLikes,
    updatedDislikes,
};