import * as React from 'react';
import { BindAll } from 'lodash-decorators';

import { MakeHandlersProps, withHandlers } from 'shared/helpers/reactive';
import { Icon, Input } from 'shared/view/elements';
import { block } from 'shared/helpers/bem';

import './MessageInput.scss';

const b = block('message-input');

type HandlersProps = MakeHandlersProps<'message'>;

interface IOwnProps {
  disabled?: boolean;
  onSendMessage(message: string): void;
}

type Props = IOwnProps & HandlersProps;

@BindAll()
class Message extends React.Component<Props> {

  public render() {
    const { message, disabled } = this.props;

    return (
      <div className={b()}>
        <Input.TextArea
          disabled={disabled}
          className={b('input')}
          value={message.value}
          onChange={this.onMessageChange}
          placeholder="Write a message ..."
          autosize={{ minRows: 1, maxRows: 3 }}
        />
        {!disabled && message.value &&
          <Icon onClick={this.sendMessage} type="check-circle" className={b('send-icon')} />}
      </div>
    );
  }

  private onMessageChange(ev: React.ChangeEvent<HTMLTextAreaElement>) {
    this.props.message.setValue(ev.target.value);
  }

  private sendMessage() {
    const { message, onSendMessage } = this.props;
    onSendMessage(message.value);
    message.setValue('');
  }
}

export default withHandlers<HandlersProps>(['message'])(Message);
