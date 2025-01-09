import React from 'react';
import { ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import SavedArticle from '@/components/SavedArticle';

interface NewsProps {
  articles: {
    data: string,
    id: string,
  };
} 

const SavedList = ({ articles }: NewsProps) => {
  const router = useRouter(); 

  return (
    <ScrollView style={styles.scrollView}>
      {articles.slice(0, 20).map((article, index) => (
        <Pressable
          key={index}
          onPress={() => {
            router.push({
              pathname: `/pages/${index}`,
              params: {article: article.data} ,
            });
          }}
        >
          <SavedArticle data={article.data} id={article.id}/>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export default SavedList;