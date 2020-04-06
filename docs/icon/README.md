### ICON <Badge text="BETA" type="warning"/>

<table>
    <thead>
        <tr>
            <th>
                Название иконки
            </th>
            <th>
                Как выглядит иконка
            </th>
        </tr>
    </thead>
    <tbody>
        <template v-for="item in items">
            <tr>
                <td>{{ item.name }}</td>
                <td>
                    <img :src="item.url" :alt="item.name" width="50px">
                </td>
            </tr>
        </template>
    </tbody>
</table>

<script>
import data from '../.vuepress/mock/icon.json';
export default {
  data () {
      return {
          items: data
      }
  },
}
</script>
<style scoped>
.icon-wrapper {
    display: flex;
}
</style>
