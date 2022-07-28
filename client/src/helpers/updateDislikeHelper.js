import {GET_MESSAGES} from '../queries';
import {MESSAGES_COUNT, orderBy} from '../constants';

const updateDislikesStore = ( messageId, page ) => (cache, { data: { updateDislikes } })  => {

    const { messages } = cache.readQuery({
        query: GET_MESSAGES,
        variables: {
            skip: page * MESSAGES_COUNT,
            take: MESSAGES_COUNT,
            orderBy },
    });
    const updatedLikes = messages.messageList.map(item => {
        if (item.id === messageId) {

            return {
                ...item,
                dislikes: updateDislikes.dislikes,
            };
        }

        return item;
    });

    cache.writeQuery({
        query: GET_MESSAGES,
        variables: { orderBy },
        data: { messages: { ...messages, messageList: updatedLikes } },
    });

}

export { updateDislikesStore };