import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { buildings } from './../utils/constants';
import format from 'date-fns/format';

const BookingCard = ({ data, onDelete }) => {
  const { id, created_at, building, seat, date, profiles } = data;

  const buildingName = buildings.find((b) => b.value === building).label;

  return (
    <Card containerStyle={styles.container}>
      <Card.Title>{date}</Card.Title>
      <Card.Divider />
      <View style={{ alignItems: 'center' }}>
        <Text style={[styles.building, styles.fonts]}>{buildingName}</Text>
        <Text style={[styles.seat, styles.fonts]}>{`seat #${seat}`}</Text>
        <Text style={styles.createdAt}>
          {`created: ${format(new Date(created_at), 'dd/MM/yyyy HH:mm')}`}
        </Text>
        {profiles && (
          <Text style={styles.bookedBy}>by {profiles.display_name}</Text>
        )}
        <Button
          icon={
            <Icon
              name="cancel"
              color="#ffffff"
              iconStyle={{ marginRight: 10 }}
            />
          }
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="Delete"
          onPress={() => onDelete(id)}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 'auto',
  },
  building: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  seat: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  createdAt: {
    fontSize: 16,
  },
  bookedBy: {
    fontSize: 16,
  },
  fonts: {
    marginBottom: 8,
  },
});

export { BookingCard };
