import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect} from 'react';
import {Icons} from '../../../constants/Icons';
import {handleUsersNewsShare} from '../../../utils/newsUtils/Share';

export default function CustomDropDown({
  visible,
  onClose,
  onOptionSelect,
  identify,
  authorName,
  items,
  selectedCommentIndex,
  backgroundColor = 'rgb(2 132 199)',
  onToastShow,
  onConfirmDelete,
}) {
  const condition =
    identify === authorName || identify.includes('admin') ? true : false;
  const options = [
    {
      id: condition ? 'delete' : 'alert-circle-outline',
      label: condition ? 'Удалить' : 'Пожаловаться',
      icon: condition ? 'delete' : 'alert-circle-outline',
    },
    {id: 'share', label: 'Поделиться', icon: 'share'},
  ];

  const handleBackgroundPress = () => onClose();

  const defaultOptionSelect = optionId => {
    switch (optionId) {
      case 'delete':
        onClose();
        onConfirmDelete();
        break;
      case 'alert-circle-outline':
        onClose();
        onToastShow(true);
        break;
      case 'share':
        shareComment();
        break;
    }
  };

  const shareComment = () => {
    if (selectedCommentIndex !== null) {
      const commentToShare = items[selectedCommentIndex];
      const timestamp = new Date(commentToShare.timestamp);

      const day = timestamp.getDate();
      const month = timestamp
        .toLocaleString('ru-RU', {month: 'long'})
        .replace(/ь$/, 'я');
      const hours = timestamp.getHours();
      const minutes = timestamp.getMinutes();

      const formattedTime = `${day} ${month} в ${hours}:${minutes}`;

      handleUsersNewsShare({
        author: commentToShare.authorName,
        newsTitle: commentToShare.postText,
        titleType: 'комментарием',
        messageType: 'Комментарий',
        postTime: formattedTime,
      });
    }
  };

  const handleOptionSelect = onOptionSelect || defaultOptionSelect;

  useEffect(() => {
    if (!onOptionSelect) {
      const authorName = items[selectedCommentIndex]?.authorName;
      const condition =
        identify === authorName || identify.includes('admin') ? true : false;
    }
  }, [onOptionSelect]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={handleBackgroundPress}>
        <View style={styles.modalContainer}>
          <View
            style={[styles.modalContent, {backgroundColor: backgroundColor}]}>
            <FlatList
              data={options}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handleOptionSelect(item.id)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <Text style={styles.optionText}>{item.label}</Text>
                    <Icons.MaterialCommunityIcons
                      name={item.icon}
                      color="rgb(186 230 253)"
                      size={28}
                      style={{marginLeft: 8}}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: 200,
  },
  optionText: {
    fontSize: 16,
    paddingVertical: 10,
    color: 'white',
    fontFamily: 'Inter-Black',
    textShadowColor: 'rgba(226, 232, 240, 0.25)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
});
