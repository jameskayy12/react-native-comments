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
  Alert
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
      menuVisible: false
    };

    this.handleReport = this.handleReport.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUsernameTap = this.handleUsernameTap.bind(this);
    this.handleLikesTap = this.handleLikesTap.bind(this);
    this.onSelect = this.onSelect.bind(this);

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
    if (value == 'Report') {
      this.props.reportCommentPress(this.props.id)
      return
    }
    if (value == 'Delete') {
      this.props.deleteAction(this.props.id)
      return
    }
  }

  render() {
    return (
      <View style={styles.commentContainer}>
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
            <Text style={styles.body}>{this.props.body}</Text>
          </View>
          <View style={[styles.rightActionBar]}>
            <View></View>
            <View style={styles.bottomRightActionBar}>
              <View style={{ marginRight: 12 }}>
                <ModalDropdown onSelect={this.onSelect} dropdownStyle={{ height: this.props.isOwner() ? 70 : 35 }} options={this.props.isOwner() ? ['Report', 'Delete'] : ['Report']}>
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
                    <TouchableOpacity disabled={this.props.userVote === 'up'} onPress={() => this.props.upVotePress(this.props.id)} style={{ padding: 5 }}>
                      {this.props.userVote === 'up'
                        ? <Image style={{ width: 17, height: 17 }} source={require('./top-arrow-fill.png')} />
                        : <Image style={{ width: 17, height: 17 }} source={require('./top-arrow.png')} />
                      }
                    </TouchableOpacity>
                    <Text style={styles.vote}>
                      {this.props.voteCount}
                    </Text>
                    <TouchableOpacity disabled={this.props.userVote === 'down'} onPress={() => this.props.downVotePress(this.props.id)} style={{ padding: 5 }}>
                      {this.props.userVote === 'down'
                        ? <Image style={{ width: 17, height: 17 }} source={require('./bottom-arrow-fill.png')} />
                        : <Image style={{ width: 17, height: 17 }} source={require('./bottom-arrow.png')} />
                      }
                    </TouchableOpacity>
                  </View>
                </TouchableHighlight>
              ) : null}
            </View>
          </View>
        </View>
        {/* {this.state.menuVisible ? (
            <View style={styles.menu}>
              {this.props.canEdit ? (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={this.handleEdit}
                >
                  <Text style={styles.menuText}>Edit</Text>
                </TouchableOpacity>
              ) : null}
              {this.props.reportAction ? (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={this.handleReport}
                >
                  {this.props.reported ? (
                    <Text
                      style={[
                        styles.menuText,
                        { fontStyle: "italic", fontSize: 11 }
                      ]}
                    >
                      Reported
                    </Text>
                  ) : (
                    <Text style={styles.menuText}>Report</Text>
                  )}
                </TouchableOpacity>
              ) : null}
              {this.props.canEdit ? (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={this.handleDelete}
                >
                  <Text style={styles.menuText}>Delete</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null} */}
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

