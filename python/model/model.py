import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import pickle


iris_data = pd.read_csv('D:/CodingStorage/reactNative/FlaskReactProject/python/model/iris.data')
print(iris_data)

columns_name = ['Sepal length', 'Sepal width', 'Petal length', 'Petal Width', 'class']
features = iris_data.iloc[:, 0:4]
label = iris_data.iloc[:, 4]

X_train, X_test, y_train, y_test = train_test_split(features, label, test_size=0.2, random_state=0)

sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

classifier = RandomForestClassifier()

classifier.fit(X_train, y_train)

pickle.dump(classifier, open('model.pkl', 'wb'))