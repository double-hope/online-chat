import {GET_MESSAGES} from "../queries";
import {orderBy} from "../constants";

const updateDislikesStore = ( messageId ) => (cache, { data: { updateDislikes } })  => {

    const { messages } = cache.readQuery({
        query: GET_MESSAGES,
        variables: { orderBy },
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