/**
 * Created by tino on 6/6/17.
 */
import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput
} from "react-native";
import Octicons from 'react-native-vector-icons/Octicons'
import PropTypes from "prop-types";
import TimeAgo from "react-native-timeago";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import Collapsible from "react-native-collapsible";
import Feather from 'react-native-vector-icons/Entypo'
import ModalDropdown from 'react-native-modal-dropdown';

export default class Comment extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
      isEditing: false,
      text: this.props.body,
    };

    this.handleReport = this.handleReport.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUsernameTap = this.handleUsernameTap.bind(this);
    this.handleLikesTap = this.handleLikesTap.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.submitOnPress = this.submitOnPress.bind(this)

  }

  handleReport() {
    // Alert.alert(
    //   "Confirm report",
    //   "Are you sure you want to report?",
    //   [
    //     {
    //       text: "Yes",
    //       onPress: () => this.props.reportAction(this.props.data)
    //     },
    //     { text: "No", onPress: () => null }
    //   ],
    //   true
    // );
    // this.setState({ menuVisible: false });
  }
  handleReply() {
    this.props.replyAction(this.props.data);
  }
  handleLike() {
    this.props.likeAction(this.props.data);
  }
  handleEdit() {
    this.props.editComment(this.props.data);
    this.setState({ menuVisible: false });
  }

  handleDelete() {
    Alert.alert(
      "Confirm delete",
      "Are you sure you want to delete?",
      [
        {
          text: "Yes",
          onPress: () => this.props.deleteAction(this.props.data)
        },
        { text: "No", onPress: () => null }
      ],
      true
    );
    this.setState({ menuVisible: false });
  }
  handleUsernameTap() {
    if (this.props.usernameTapAction) {
      this.props.usernameTapAction(this.props.username);
    }
  }
  handleLikesTap() {
    this.props.likesTapAction(this.props.data);
  }

  setModalVisible() {
    this.setState({ menuVisible: !this.state.menuVisible });
  }

  onSelect(index, value) {
    if (value == 'Edit') {
      this.setState({ isEditing: true })
      return
    }
    if (value == 'Report') {
      this.props.reportCommentPress(this.props.id)
      return
    }
    if (value == 'Delete') {
      this.props.deleteAction(this.props.id)
      return
    }
  }

  submitOnPress() {
    this.props.editSubmit(this.state.text, this.props.data.id)
    this.setState({
      isEditing: false
    })
  }

  render() {
    return (
      <View style={[styles.commentContainer, { marginVertical: !this.props.child ? 7 : 0 }]}>
        {this.props.child && <View style={styles.verticalLineView}></View>}
        <View style={[styles.right]}>
          <View style={styles.rightContent}>
            <View style={styles.rightContentTop}>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <TouchableHighlight onPress={this.handleUsernameTap}>
                  <Text style={styles.name}>{this.props.username}</Text>
                </TouchableHighlight>
                <TimeAgo style={styles.time} time={this.props.updatedAt} />
              </View>
            </View>
            {!this.state.isEditing && <Text style={styles.body}>{this.props.body}</Text>}
          </View>

          {this.state.isEditing && <View style={styles.isEditingContainer}>
            <TextInput multiline onChangeText={(value) => this.setState({ text: value })} value={this.state.text} style={styles.editTextInput}>
            </TextInput>
            <TouchableOpacity onPress={() => this.submitOnPress()} style={styles.editButton}>
              <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>
                {'Edit'}
              </Text>
            </TouchableOpacity>
          </View>}

          {!this.state.isEditing && <View style={[styles.rightActionBar]}>
            <View></View>
            <View style={styles.bottomRightActionBar}>
              <View style={{ marginRight: 12 }}>
                <ModalDropdown onSelect={this.onSelect} dropdownStyle={{ height: this.props.isOwner() ? 105 : 35 }} options={this.props.isOwner() ? ['Report 🏴', 'Edit     🖋️', 'Delete 🗑️'] : ['Report 🏴']}>
                  <Feather name='dots-three-vertical' size={16} color={'#8a8a8a'} />
                </ModalDropdown>
              </View>
              {!this.props.child ? (
                <TouchableHighlight
                  style={styles.replyButton}
                  onPress={this.handleReply}
                >
                  <Image style={{ width: 17, height: 18, resizeMode: 'contain' }} source={require('./reply.png')} />
                </TouchableHighlight>
              ) : null}
              {this.props.likeAction ? (
                <TouchableHighlight
                  style={styles.actionButton}
                  onPress={this.handleLike}
                >
                  <View style={{ flexDirection: "row", alignItems: 'center', width: 65 }}>
                    <TouchableOpacity onPress={() => this.props.upVotePress(this.props.id, this.props.userVote)} style={{ padding: 5 }}>
                      {this.props.userVote === 'up'
                        ? <Image style={{ width: 17, height: 17 }} source={require('./top-arrow-fill.png')} />
                        : <Image style={{ width: 17, height: 17 }} source={require('./top-arrow.png')} />
                      }
                    </TouchableOpacity>
                    <Text style={[styles.vote, { color: this.props.userVote == 'up' ? '#ff460f' : this.props.userVote == 'down' ? '#017ad7' : '#bcbcbc' }]}>
                      {this.props.voteCount}
                    </Text>
                    <TouchableOpacity onPress={() => this.props.downVotePress(this.props.id, this.props.userVote)} style={{ padding: 5 }}>
                      {this.props.userVote === 'down'
                        ? <Image style={{ width: 17, height: 17 }} source={require('./bottom-arrow-fill.png')} />
                        : <Image style={{ width: 17, height: 17 }} source={require('./bottom-arrow.png')} />
                      }
                    </TouchableOpacity>
                  </View>
                </TouchableHighlight>
              ) : null}
            </View>
          </View>}
        </View>
      </View>
    );
  }
}

Comment.propTypes = {
  data: PropTypes.object,
  body: PropTypes.string,
  canEdit: PropTypes.bool,
  child: PropTypes.bool,
  editComment: PropTypes.func,
  likeAction: PropTypes.func,
  liked: PropTypes.bool,
  likesNr: PropTypes.number,
  likesTapAction: PropTypes.func,
  replyAction: PropTypes.func,
  deleteAction: PropTypes.func,
  reportAction: PropTypes.func,
  reported: PropTypes.bool,
  updatedAt: PropTypes.string,
  username: PropTypes.string,
  usernameTapAction: PropTypes.func
};

