<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6 mt-6 md:mt-8">
    <h2 class="text-lg font-bold text-hope-dark mb-5">Upcoming Matches</h2>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="text-left text-gray-500 border-b border-gray-100">
            <th class="py-3 pr-4 font-semibold">Match</th>
            <th class="py-3 pr-4 font-semibold">Date</th>
            <th class="py-3 pr-4 font-semibold">Venue</th>
            <th class="py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-50">
            <td class="py-3 pr-4 text-hope-dark font-medium">Team A vs Team B</td>
            <td class="py-3 pr-4 text-gray-600">Feb 20, 2026</td>
            <td class="py-3 pr-4 text-gray-600">Main Stadium</td>
            <td class="py-3"><span class="text-hope-cyan font-semibold">Scheduled</span></td>
          </tr>
          <tr class="border-b border-gray-50">
            <td class="py-3 pr-4 text-hope-dark font-medium">Team C vs Team D</td>
            <td class="py-3 pr-4 text-gray-600">Feb 22, 2026</td>
            <td class="py-3 pr-4 text-gray-600">Training Ground</td>
            <td class="py-3"><span class="text-hope-lime font-semibold">Confirmed</span></td>
          </tr>
          <tr>
            <td class="py-3 pr-4 text-hope-dark font-medium">Team E vs Team F</td>
            <td class="py-3 pr-4 text-gray-600">Feb 24, 2026</td>
            <td class="py-3 pr-4 text-gray-600">City Arena</td>
            <td class="py-3"><span class="text-hope-red font-semibold">Pending</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
