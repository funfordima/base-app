import type { SubscriptionLike } from 'rxjs';
import { Subscription } from 'rxjs';

export class SubSink extends Subscription {
  set sink(subscription: SubscriptionLike) {
    this.add(subscription);
  }
}
