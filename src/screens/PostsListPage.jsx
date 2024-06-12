import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

export default function PostsListPage() {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleLike = async (id) => {
    const postRef = doc(db, "posts", id);
    const post = posts.find(post => post.id === id);
    await updateDoc(postRef, {
      likes: (post.likes || 0) + 1
    });
    setPosts(posts.map(post => post.id === id ? { ...post, likes: (post.likes || 0) + 1 } : post));
  };

  const handleDislike = async (id) => {
    const postRef = doc(db, "posts", id);
    const post = posts.find(post => post.id === id);
    await updateDoc(postRef, {
      dislikes: (post.dislikes || 0) + 1
    });
    setPosts(posts.map(post => post.id === id ? { ...post, dislikes: (post.dislikes || 0) + 1 } : post));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
            <View style={styles.buttons}>
              <Button title="Editar" onPress={() => navigation.navigate('EditPost', { id: item.id })} />
              <Button title="Deletar" onPress={() => handleDelete(item.id)} />
              <Button title={`Like (${item.likes || 0})`} onPress={() => handleLike(item.id)} />
              <Button title={`Dislike (${item.dislikes || 0})`} onPress={() => handleDislike(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e3f2fd',
  },
  post: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});
