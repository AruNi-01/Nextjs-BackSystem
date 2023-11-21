import { useEffect } from 'react';
import PubSub from 'pubsub-js';

const useSubsByPubSubJS = (
  subs: { topic: string; action: (message: string, data?: any) => void }[]
) => {
  useEffect(() => {
    const tokens = subs.map(({ topic, action }) => {
      return PubSub.subscribe(topic, action);
    });

    return () => {
      tokens.forEach((token) => PubSub.unsubscribe(token));
    };
  }, []);
};

export { useSubsByPubSubJS };
