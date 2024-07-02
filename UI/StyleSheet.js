import { StyleSheet } from 'react-native';

styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      padding: 20
    },
    createAccountContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    createDrinkContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
      justifyContent: 'space-between',
      backgroundColor: 'light-blue',
      padding: 16,
      margin: 10,
    },
    profileView: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'light-blue',
      padding: 16,
      margin: 10,
    },
    subContainer: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 200,
      height: 200,
    },
    profileImage: {
      width: 200,
      height: 200,
      borderTopLeftRadius: 100,
      borderTopRightRadius: 100,
      borderBottomLeftRadius: 100,
      borderBottomRightRadius: 100,
    },
    text: {
      color: 'purple',
      fontSize: 16,
      padding: 3,
      textAlign: 'center',
    },
    headerText: {
      color: 'purple',
      fontSize: 30,
      padding: 20,
      textAlign: 'center',
    },
    collapseButton: {
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      marginBottom: 10,
      borderWidth: 2,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
      },
    input: {
        fontSize: 16,
        height: 40,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
      },
    createAccountInput: {
        width: '80%',
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10
    },
    error: {
        color: 'red',
    },
    barListText: {
      color: 'purple',
      justifyContent: 'center',
      fontSize: 20,
      padding: 3,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    emptyText: {
      fontSize: 18,
      color: 'gray',
    },
    checkBox: {
      flexDirection: 'row',
      alignItems: 'center'
  }
})

export default styles