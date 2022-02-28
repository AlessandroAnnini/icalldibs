import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import format from 'date-fns/format';

const isWeb = Platform.OS === 'web';

const Calendar = ({ minDate = new Date(), maxDate, value, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const minDateWeb = format(minDate, 'yyyy-MM-dd');
  const maxDateWeb = format(maxDate, 'yyyy-MM-dd');

  return isWeb ? (
    <>
      <Text>Date:</Text>
      <input
        type="date"
        id="booking_date"
        value={value}
        min={minDateWeb}
        max={maxDateWeb}
        onChange={(e) => {
          onChange(e.target.value);
          setIsVisible(false);
        }}
      />
    </>
  ) : (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title={value} onPress={() => setIsVisible(true)} />
      </View>
      <DateTimePickerModal
        isVisible={isVisible}
        minimumDate={minDate}
        maximumDate={maxDate}
        mode="date"
        onConfirm={(date) => onChange(format(date, 'yyyy-MM-dd'))}
        onCancel={() => setIsVisible(false)}
      />
    </>
  );
};

export { Calendar };
