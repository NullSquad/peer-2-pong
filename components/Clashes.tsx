import { User } from "@/utils/users.ts";

export function Clashes({ user, players}: { user: User; players: Players[]}) {
  return (
    <table class="min-w-full text-sm text-red-400 mb-4">
      <thead class="bg-red-800 text-xs uppercase font-medium">
        <tr>
          	<th scope="col" class="bg-orange px-6 py-3 text-center tracking-wider">
            	You
         	</th>
          	<th scope="col" class="bg-orange px-6 py-3 text-center tracking-wider">
            	Vs
          	</th>
          	<th scope="col" class="bg-orange px-6 py-3 text-center tracking-wider">
				Rival
         	</th>
		</tr>
		</thead>
		 <tbody class="bg-red-800 font-medium">
          <tr>
			  <td class="px-6 py-4 whitespace-nowrap text-center hover:text-orange">
              <a href={`https://profile.intra.42.fr/users/${user.userName}`} target="_blank">
              	{user.userName}
              </a>
			</td>
			 <td class=" px-6 py-4 whitespace-nowrap text-center">
				 -
			</td>
			 <td class="px-6 py-4 whitespace-nowrap text-center hover:text-purple">
				 rival
			</td>
		  </tr>
		<tr>
			<td class=" px-6 py-4 whitespace-nowrap text-center hover:text-orange">
              <a href={`https://profile.intra.42.fr/users/${user.userName}`} target="_blank">
              	{user.userName}
              </a>
			</td>
			 <td class=" px-6 py-4 whitespace-nowrap text-center">
				 -
			</td>
			 <td class=" px-6 py-4 whitespace-nowrap text-center hover:text-purple">
				 rival
			</td>
		  </tr>
<tr>
	<td class="px-6 py-4 whitespace-nowrap text-center hover:text-orange">
              <a href={`https://profile.intra.42.fr/users/${user.userName}`} target="_blank">
              	{user.userName}
              </a>
			</td>
			 <td class=" px-6 py-4 whitespace-nowrap text-center">
				 -
			</td>
			 <td class=" px-6 py-4 whitespace-nowrap text-center hover:text-purple">
				 rival
			</td>
		  </tr>

	</tbody>
    </table>
  );
}
