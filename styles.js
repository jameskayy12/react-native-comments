import { StyleSheet, PixelRatio } from "react-native";

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row-reverse",
    justifyContent: 'center',
  },
  left: {
    // padding: 5 ,
    backgroundColor: 'purple'
  },
  isEditingContainer: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editTextInput: {
    borderRadius: 5,
    flex: 1,
    marginRight: 15,
    height: 40,
    borderWidth: 1,
    borderColor: '#bcbcbc',
    color: '#bcbcbc',
    paddingLeft: 7,
  },
  editButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#017ad7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15
  },
  verticalLineView: {
    width: 0.7,
    height: '100%',
    backgroundColor: '#bcbcbc',
    position: 'absolute',
    right: 0
  },
  right: {
    flex: 1,
    // backgroundColor : 'blue'
  },
  rightContent: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#00000",
  },
  rightContentTop: {
    flexDirection: "row",
    // backgroundColor: 'red',
  },

  name: {
    fontWeight: "bold",
    paddingBottom: 5,
    color: '#bcbcbc',
  },
  editIcon: {
    flex: 1,
    alignItems: "flex-end"
  },
  body: {
    paddingBottom: 10,
    color: '#bcbcbc',
  },
  rightActionBar: {
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: 'blue',
  },
  actionButton: {
  },
  replyButton: {
    padding: 5,
    marginRight: 12
  },
  bottomRightActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
    marginBottom: -5
  },
  time: {
    fontSize: 12,
    marginLeft: 10,
    top: -2,
    alignSelf: 'center',
    color: "#5C5C5C",
  },
  actionText: {
    color: '#bcbcbc',
    fontWeight: "bold",
  },
  vote: {
    marginHorizontal: 3,
    color: '#bcbcbc',
    fontFamily: 'Roboto',
  },
  repliedSection: {
    paddingTop: 5,
    paddingBottom: 5,
    width: 150,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  repliedImg: {
    height: 20,
    width: 20,
    borderRadius: 10
  },
  repliedUsername: {
    color: "#9B9B9B"
  },
  repliedText: {
    color: '#bcbcbc',
    height: 30,
    justifyContent: 'center',
  },
  repliedCount: {
    color: "#9B9B9B",
    fontSize: 11
  },
  inputSection: {
    height: 39,
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center",
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    width: '90%',
    alignSelf: 'flex-start',
    alignSelf: 'center',
  },
  submit: {
    padding: 10
  },
  input: {
    flex: 1,
    borderRadius: 10,
    height: 50,
    padding: 10,
    backgroundColor: "#393a3c",
    color: "#9B9B9B"
  },
  likeNr: {
    fontWeight: "normal",
    fontSize: 12,
    color: '#bcbcbc',
  },
  likeHeader: {
    textAlign: "center",
    padding: 10,
    marginTop: 30,
    fontWeight: "bold"
  },
  likeButton: {
    margin: 10,
    alignItems: "center"
  },
  likeContainer: {
    padding: 10,
    width: 200,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row"
  },
  likeImage: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  likename: {
    fontWeight: "bold",
    fontSize: 14,
    color: '#bcbcbc',
  },
  editModalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  editModal: {
    backgroundColor: "white",
    margin: 10,
    paddingTop: 10,
    width: "90%",
    height: 300,
    borderWidth: 2,
    borderColor: "silver"
  },
  editButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 40,
    width: 80,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 5,
    margin: 10
  },
  menu: {
    borderWidth: 1,
    borderColor: "silver",
    zIndex: 999,
    width: 200,
    right: 0,
    top: 0,
    backgroundColor: "white",
    position: "absolute"
  },
  menuItem: {
    padding: 10,
    height: 40,

    justifyContent: "center"
  },
  menuText: {
    textAlign: "center",
    color: '#bcbcbc',
  }
});

export default styles;
